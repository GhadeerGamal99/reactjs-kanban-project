import { COLUMNS } from "../../consts";
import Column from "./Column";

const Board = () => {
    return (
        <div className="flex flex-wrap justify-center min-h-[85vh] gap-4 mx-8 my-4">
            {COLUMNS.map(col => (<Column key={col} columnName={col} />))}
        </div>
    )
}

export default Board