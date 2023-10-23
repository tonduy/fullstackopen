import {CoursePart} from "../types";
import Part from "./part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
        <div>
            {parts.map((part, index) => (
                <div key={index}>
                    <div>
                        <h3>
                            {part.name} {part.exerciseCount}
                        </h3>
                    </div>
                    <Part part={part} />
                </div>
            ))}
        </div>
    );
};



export default Content;
