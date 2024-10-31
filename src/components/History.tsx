import { ThumbsDown, ThumbsUp, Minus } from 'lucide-react';
import { usePalletContext } from '../PalletContext';
import './styles/History.css';

interface HistoryProps {
    inputHistory: {text: string, status: 'skipped' | 'found' | 'wrong'}[];
    shortcutList: { key: string; command: string; }[];
}

const History = ({ inputHistory, shortcutList }: HistoryProps) => {
    
    // Add success rate calculation
    const successRate = inputHistory.length > 0
        ? Math.round((inputHistory.filter(input => input.status === 'found').length / inputHistory.length) * 100)
        : 0;

    return (
        <div className={`history-wrapper `}>
            {inputHistory.length > 0 && (
                <>
                <div className="success-rate">
                    <div >Success Rate: {successRate}%</div>
                    <div className="length">Total tries: {inputHistory.length}</div>
                    <div className="completed">Completed Shortcuts: {inputHistory.filter(input => input.status === 'found').length}/{shortcutList.length}</div>
                </div>
                </>
            )}
            <div className="history-section">
                {inputHistory.length > 0 ? (
                    <>
                    <ul className='history-list'>
                    {[...inputHistory].reverse().map((input, index) => {
                            const [shortcut, command] = input.text.split(' - ');
                            return (
                                <li 
                                    className={`singleInputHistory ${input.status}`}
                                    key={index}>
                                    <div className="header">
                                        {input.status === 'wrong' ? <ThumbsDown /> : 
                                         input.status === 'skipped' ? <Minus /> : 
                                         <ThumbsUp />}
                                    </div>
                                    <div className="content">
                                        <div className="shortcut">{shortcut}</div>
                                        <div className="command">{command}</div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    </>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default History;
