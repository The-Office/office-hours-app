import { getCourses, getCourseFiles } from './canvasService';


export async function writeCourseNames() {
  // Temp fixed token, will change in future
  const courses = await getCourses("1016~e6kvGuP4EmzBkUrmmkke2WuuyRCvvQnaT6mWKTUeYyZtKBFMkhT3aNDAtyrf2Gvr");

  let courses_string = "";
  for(let i = 0; i < courses.list.length; i++) {
    if(!courses.list[i]["access_restricted_by_date"]) {
      courses_string += "  " + courses.list[i]["name"];
    }
  }
  return courses_string;
}

export async function writeCoursesSyllabi() {
  // Temp fixed token, will change in future
  const course_files = await getCourseFiles("521976", "1016~e6kvGuP4EmzBkUrmmkke2WuuyRCvvQnaT6mWKTUeYyZtKBFMkhT3aNDAtyrf2Gvr");
  return course_files[0];
}

