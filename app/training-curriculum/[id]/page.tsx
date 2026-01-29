import AttendeeEditor from "@/components/attendee-editor";
import SessionEditor from "@/components/skill-editor";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const mockTrainingData = {
        title: "Online Training Session",
        description: "An in-depth online training session on various topics.",
        attendees: [
            {
                id: "1",
                name: "Alice Johnson",
                email: "alice.johnson@example.com",
                registeredAt: "2024-01-15T10:00:00Z",
            },
            {
                id: "2",
                name: "Bob Smith",
                email: "bob.smith@example.com",
                registeredAt: "2024-01-16T11:30:00Z",
            },
        ],
    };

    // You can fetch your training data here on the server
    // const initialData = await db.training.findUnique({ where: { id } });

    return (
        <div className="p-8">
            {/* <h1 className="text-xl mb-4">Editing Training: {id}</h1> */}
            {id === "online-tutorials" && (
                <TrainingComponent training={mockTrainingData} />
            )}
            {id === "sessions" && <SessionEditor trainingId={id} />}
            {id === "attendees" && <AttendeeEditor trainingId={id} />}
        </div>
    );
}

const AttendeeComponent = ({ attendee }: { attendee: any }) => {
    return (
        <div className="p-4 border rounded mb-2">
            <h3 className="text-lg font-semibold">{attendee.name}</h3>
            Attendees
            <p>Email: {attendee.email}</p>
            <p>
                Registered on:{" "}
                {new Date(attendee.registeredAt).toLocaleDateString()}
            </p>
        </div>
    );
};

const TrainingComponent = ({ training }: { training: any }) => {
    return (
        <div className="p-6 border rounded">
            <h2 className="text-2xl font-bold mb-4">{training.title}</h2>
            <p className="mb-4">{training.description}</p>
            <h3 className="text-xl font-semibold mb-2">Attendees:</h3>
            {training.attendees.map((attendee: any) => (
                <AttendeeComponent key={attendee.id} attendee={attendee} />
            ))}
        </div>
    );
};
