import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllCourses, fetchUserCourses, storeUserCourse, deleteUserCourse } from "@/services/userService";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const AddCourseInput = ({
}: {
    }) => {
    const [inputValue, setInputValue] = useState("");
    const queryClient = useQueryClient();

    const { data: userCourses = [] } = useQuery({
        queryKey: ['userCourses'],
        queryFn: fetchUserCourses,
    });

    const userCourseCodes = userCourses.map(course => course.course_code);

    const { data: allCourses = [] } = useQuery({
        queryKey: ['courses'],
        queryFn: fetchAllCourses,
    });

    const storeMutation = useMutation({
        mutationFn: storeUserCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userCourses'] });
            queryClient.invalidateQueries({ queryKey: ['officeHours'] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteUserCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userCourses'] });
            queryClient.invalidateQueries({ queryKey: ['officeHours'] });
        }
    });


    const handleSelect = async (value: string) => {
        if (!userCourseCodes.includes(value)) {
            const course = allCourses.find(c => c.course_code === value);
            if (course) {
                await storeMutation.mutateAsync(course.course_id);
            }
        }
        setInputValue("");
    };

    const handleRemove = async (codeToRemove: string) => {
        const course = userCourses.find(c => c.course_code === codeToRemove);
        if (course) {
            await deleteMutation.mutateAsync(course.course_id);
        }
    };

    const filteredCourses = allCourses.filter(course =>
        !userCourseCodes.includes(course.course_code)
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start hover:bg-white cursor-text">
                    {userCourseCodes.length > 0 && (
                        <div className="flex gap-1">
                            {userCourseCodes.map(code => (
                                <Badge key={code} variant="secondary" className="rounded-sm py-1">
                                    {code}
                                </Badge>
                            ))}
                        </div>
                    )}
                    <span className="text-muted-foreground">Select Courses...</span>
                    <Search className="w-4 h-4 text-gray-400" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Select Courses</DialogTitle>
                </DialogHeader>
                <div className={cn(userCourseCodes.length > 0 && "w-full")}>
                    <Command className="rounded-lg border shadow-md">
                        <div className="flex flex-wrap gap-1 p-1">
                            {userCourseCodes.map(code => (
                                <Badge key={code} variant="secondary" className="h-7">
                                    {code}
                                    <button
                                        className="ml-1 hover:bg-slate-200 rounded-full"
                                        onClick={() => handleRemove(code)}
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                            <div className="flex-grow flex-shrink-0 mx-1">
                                <CommandInput
                                    autoFocus
                                    placeholder="Add courses..."
                                    value={inputValue}
                                    onValueChange={setInputValue}
                                    className="h-7 w-full"
                                />
                            </div>
                        </div>
                        {<CommandList>
                            {inputValue && <>
                                <CommandEmpty>No courses found.</CommandEmpty>
                                <CommandGroup className="max-h-[200px] overflow-auto">
                                    {filteredCourses.map((course) => (
                                        <CommandItem
                                            key={course.course_id}
                                            value={course.course_code}
                                            onSelect={handleSelect}
                                        >
                                            {course.course_code} - {course.title}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </>}
                        </CommandList>}
                    </Command>
                </div>
            </DialogContent>
        </Dialog>
    );
};