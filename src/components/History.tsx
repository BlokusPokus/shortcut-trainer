import './History.css';

interface HistoryProps {
    inputHistory: string[];
}

const History = ({ inputHistory }: HistoryProps) => {
    return (
        <div className="history-section">
            <h2>History of Inputs</h2>
            {inputHistory.length > 0 ? (
                <ul className='history-list'>
                    {inputHistory.map((input, index) => (
                        <p 
                        className="singleInputHistory"
                        key={index}>{input}</p>
                    ))}
                </ul>
            ) : (
                <p>No shortcuts used yet!</p>
            )}
        </div>
    );
};

export default History;
