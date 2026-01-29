import AttendeeEditor from "@/components/attendee-editor";
import SessionEditor from "@/components/skill-editor";
import TrainingEditor from "@/components/training-editor";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // You can fetch your training data here on the server
    // const initialData = await db.training.findUnique({ where: { id } });

    return (
        <div className="p-8">
            {id === "online-tutorials" && <TrainingEditor trainingId={id} />}
            {id === "sessions" && <SessionEditor trainingId={id} />}
            {id === "attendance" && <AttendeeEditor trainingId={id} />}
        </div>
    );
}
