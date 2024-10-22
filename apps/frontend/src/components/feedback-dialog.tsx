import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import StarRating from './star-rating.tsx';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const FeedbackDialog = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger>Give Feedback</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Give Feedback</DialogTitle>
                    </DialogHeader>
                    <StarRating />
                    <hr className="my-4 border-dotted border-1 border-gray-300" />
                    <Textarea />
                    <hr className="my-4 border-dotted border-1 border-gray-300" />
                    <Button>Submit</Button>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default FeedbackDialog;
