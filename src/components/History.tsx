import { usePalletContext } from '../PalletContext';
import './History.css';

interface HistoryProps {
    inputHistory: {text: string, status: 'skipped' | 'found' | 'wrong'}[];
}

const History = ({ inputHistory }: HistoryProps) => {
    const { theme } = usePalletContext();
    return (
        <div className={`history-wrapper ${theme}`}>
            <h2 className="history-title">History of Inputs</h2>
            <div className="history-section">
                {inputHistory.length > 0 ? (
                    <>
                    <ul className='history-list'>
                        {inputHistory.map((input, index) => {
                            const [shortcut, command] = input.text.split(' - ');
                            return (
                                <li 
                                    className={`singleInputHistory ${input.status}`}
                                    key={index}>
                                    <div className="header">{input.status.toUpperCase()}</div>
                                    <div className="content">
                                        <div className="shortcut">{shortcut}</div>
                                        <div className="command">{command}</div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <button className="download-button">Download your results</button>
                    </>
                ) : (
                    <p className='no-shortcuts'>No shortcuts used yet!</p>
                )}
            </div>
        </div>
    );
};

export default History;
