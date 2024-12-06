import re
import subprocess
from datetime import datetime

def scan_git_history():
    """
    Scans git commit history for potential secrets and sensitive information.
    Returns a list of findings with commit details and matched patterns.
    """
    # Common patterns for sensitive information
    patterns = {
        'AWS Key': r'(?i)aws[_\-\s]*(?:key|token|secret)[_\-\s]*=\s*[\'"][A-Za-z0-9/\+=]{20,}[\'"]',
        'Generic API Key': r'(?i)api[_\-\s]*key[_\-\s]*=\s*[\'"][A-Za-z0-9]{16,}[\'"]',
        'Generic Secret': r'(?i)secret[_\-\s]*=\s*[\'"][A-Za-z0-9]{16,}[\'"]',
        'Private Key': r'-----BEGIN (?:RSA|OPENSSH|DSA|EC|PGP) PRIVATE KEY-----',
        'GitHub Token': r'(?i)github[_\-\s]*token[_\-\s]*=\s*[\'"](?:ghp|gho|ghu|ghs|ghr)[_\-A-Za-z0-9]{36}[\'"]',
        'Password Assignment': r'(?i)(?:password|passwd|pwd)[_\-\s]*=\s*[\'"][^\'"\s]{8,}[\'"]',
        'Connection String': r'(?i)(?:mongodb|postgresql|mysql)(?:.[+\w]+)?://[^:\s]+:[^@\s]+@[^/\s]+',
        'Environment Variable': r'(?i)(?:^|\n)([A-Z][A-Z0-9_]*)=((?:\'|")[^\'"\n]*(?:\'|")|[^\s\n]*)',
    }

    # Environment file patterns to watch for
    env_file_patterns = [
        r'\.env(?:\.(?:local|dev|development|prod|production|test|example))?$',
        r'\.environment$',
        r'config\.(?:json|yml|yaml)$',
        r'secrets\.(?:json|yml|yaml)$',
        r'credentials\.(?:json|yml|yaml)$'
    ]

    findings = []

    try:
        # Get list of all files that have ever existed in the repository
        all_files = subprocess.check_output(
            ['git', 'log', '--pretty=format:', '--name-only', '--diff-filter=A'],
            universal_newlines=True
        ).split()

        # Check for sensitive file patterns
        for file_path in set(all_files):
            if any(re.search(pattern, file_path) for pattern in env_file_patterns):
                try:
                    # Get file history
                    file_history = subprocess.check_output(
                        ['git', 'log', '-p', '--full-history', '--', file_path],
                        universal_newlines=True
                    )
                    findings.extend(scan_env_file(file_path, file_history))
                except subprocess.CalledProcessError:
                    continue

        # Get all commits for general secret scanning
        git_log = subprocess.check_output(
            ['git', 'log', '--full-history', '--patch'],
            universal_newlines=True
        )

        current_commit = None
        current_diff = []

        for line in git_log.split('\n'):
            if line.startswith('commit '):
                if current_commit and current_diff:
                    scan_diff(current_commit, current_diff, patterns, findings)
                
                current_commit = {
                    'hash': line.split()[1],
                    'author': '',
                    'date': None,
                    'message': ''
                }
                current_diff = []
            
            elif line.startswith('Author: '):
                current_commit['author'] = line[8:].strip()
            elif line.startswith('Date: '):
                date_str = line[6:].strip()
                current_commit['date'] = datetime.strptime(date_str, '%a %b %d %H:%M:%S %Y %z')
            elif line.startswith('    '):
                current_commit['message'] += line.strip() + ' '
            else:
                current_diff.append(line)

        # Process last commit
        if current_commit and current_diff:
            scan_diff(current_commit, current_diff, patterns, findings)

    except subprocess.CalledProcessError:
        print("Error: Not a git repository or git command failed")
        return []

    return findings

def scan_env_file(file_path, file_history):
    """
    Specifically scans environment file history for sensitive information.
    """
    findings = []
    current_commit = None
    
    for line in file_history.split('\n'):
        if line.startswith('commit '):
            current_commit = {
                'hash': line.split()[1],
                'author': '',
                'date': None,
                'message': ''
            }
        elif line.startswith('Author: '):
            current_commit['author'] = line[8:].strip()
        elif line.startswith('Date: '):
            date_str = line[6:].strip()
            current_commit['date'] = datetime.strptime(date_str, '%a %b %d %H:%M:%S %Y %z')
        elif line.startswith('+') and '=' in line:
            # Look for environment variable assignments
            line = line[1:].strip()  # Remove the '+' prefix
            if '=' in line:
                key, value = line.split('=', 1)
                key = key.strip()
                value = value.strip().strip("'\"")
                
                # Skip if it's an example/template value
                if any(x in value.lower() for x in ['example', 'changeme', 'yourkey', 'xxx', '<insert']):
                    continue
                    
                if len(value) > 8:  # Only report if value seems substantial
                    findings.append({
                        'commit_hash': current_commit['hash'],
                        'author': current_commit['author'],
                        'date': current_commit['date'],
                        'message': 'Environment file modification',
                        'pattern_type': 'Environment File',
                        'matched_content': f'{key}={value}',
                        'context': f'File: {file_path}',
                        'file_path': file_path
                    })
    
    return findings

def scan_diff(commit, diff_lines, patterns, findings):
    """
    Scans a specific commit's diff for matches against secret patterns.
    """
    diff_text = '\n'.join(diff_lines)
    
    for pattern_name, pattern in patterns.items():
        matches = re.finditer(pattern, diff_text)
        
        for match in matches:
            # Get surrounding lines for context
            start = max(0, diff_text.rfind('\n', 0, match.start()) + 1)
            end = diff_text.find('\n', match.end())
            if end == -1:
                end = len(diff_text)
            
            context = diff_text[start:end].strip()
            
            findings.append({
                'commit_hash': commit['hash'],
                'author': commit['author'],
                'date': commit['date'],
                'message': commit['message'].strip(),
                'pattern_type': pattern_name,
                'matched_content': match.group(0),
                'context': context
            })

def format_findings(findings):
    """
    Formats the findings into a readable report.
    """
    if not findings:
        return "No secrets found in git history."

    # Group findings by file path for environment files
    env_findings = {}
    general_findings = []

    for finding in findings:
        if 'file_path' in finding:
            if finding['file_path'] not in env_findings:
                env_findings[finding['file_path']] = []
            env_findings[finding['file_path']].append(finding)
        else:
            general_findings.append(finding)

    report = "🔍 Secret Scanner Report\n\n"

    # Report environment file findings
    if env_findings:
        report += "📁 Environment Files:\n" + "=" * 50 + "\n"
        for file_path, file_findings in env_findings.items():
            report += f"\nFile: {file_path}\n" + "-" * 50 + "\n"
            for finding in file_findings:
                report += f"Commit: {finding['commit_hash'][:8]}\n"
                report += f"Author: {finding['author']}\n"
                report += f"Date: {finding['date'].strftime('%Y-%m-%d %H:%M:%S')}\n"
                report += f"Found: {finding['matched_content']}\n\n"

    # Report general findings
    if general_findings:
        report += "\n🔐 General Secrets:\n" + "=" * 50 + "\n"
        for idx, finding in enumerate(general_findings, 1):
            report += f"\nFinding #{idx}:\n"
            report += f"Pattern Type: {finding['pattern_type']}\n"
            report += f"Commit: {finding['commit_hash'][:8]}\n"
            report += f"Author: {finding['author']}\n"
            report += f"Date: {finding['date'].strftime('%Y-%m-%d %H:%M:%S')}\n"
            report += f"Commit Message: {finding['message']}\n"
            report += f"Context:\n  {finding['context']}\n"
            report += "-" * 80 + "\n"

    return report

if __name__ == "__main__":
    print("Scanning git history for secrets...")
    findings = scan_git_history()
    print(format_findings(findings))