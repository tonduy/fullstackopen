import { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <i>{part.description}</i>
                </div>
            );
        case "group":
            return <div>
                <p>project exercises {part.groupProjectCount}</p>
            </div>;
        case "background":
            return (
                <div>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>
                        <p>submit to:{part.backgroundMaterial}</p>
                    </div>
                </div>
            );
        default:
            return assertNever(part);
    }
};

export default Part;
