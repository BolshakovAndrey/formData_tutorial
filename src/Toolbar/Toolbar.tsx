        import React, {useRef, useState} from 'react';
        import './styles.css';

        interface ToolbarProps {
            onBold: () => void;
            onItalic: () => void;
            onUnderline: () => void;
            onStrikeThrough: () => void;
            onBulletList: () => void;
            onNumberedList: () => void;
            onTextColor: (color: string) => void;
            onBackgroundColor: (color: string) => void;
        }

        const Toolbar: React.FC<ToolbarProps> = ({
            onBold,
            onItalic,
            onUnderline,
            onStrikeThrough,
            onBulletList,
            onNumberedList,
            onTextColor,
            onBackgroundColor,
        }) => {
            const [ textColor, setTextColor ] = useState('#ff0000');
            const [ backgroundColor, setBackgroundColor ] = useState('#ffff00');

            // Реф для отслеживания количества перерендеров
            const renderCountRef = useRef<number>(0);
            renderCountRef.current += 1;
            console.log(`Toolbar render count: ${renderCountRef.current}`);

            return (
                <div className="toolbar">
                    <button
                        title="Жирный"
                        className="toolbarButton"
                        onClick={onBold}
                        aria-label="Полужирный"
                    >
                        <b>B</b>
                    </button>
                    <button
                        title="Курсив"
                        className="toolbarButton"
                        onClick={onItalic}
                        aria-label="Курсив"
                    >
                        <i>I</i>
                    </button>
                    <button
                        title="Подчеркнутый"
                        className='toolbarButton'
                        onClick={onUnderline}
                        aria-label="Подчеркнутый"
                    >
                        <u>U</u>
                    </button>
                    <button
                        title="Зачеркнутый"
                        className='toolbarButton'
                        onClick={onStrikeThrough}
                        aria-label="Зачеркнутый"
                    >
                        <s>S</s>
                    </button>
                    <button
                        title="Маркированный список"
                        className='toolbarButton'
                        onClick={onBulletList}
                        aria-label="Маркированный список"
                    >
                        • L
                    </button>
                    <button
                        title="Нумерованный список"
                        className='toolbarButton'
                        onClick={onNumberedList}
                        aria-label="Нумерованный список"
                    >
                        1.L
                    </button>

                    {/* Кнопка для выбора цвета текста */}
                    <div className='colorPicker'>
                        <div className='iconWrapper' style={{ '--color': textColor } as React.CSSProperties}>
                            <div className='topSection'>
                                <span className='textIcon'>A</span>
                            </div>
                            <div className='bottomSection'></div>
                            {/* Отображение выбранного цвета */}
                        </div>
                        <input
                            type="color"
                            title="Выбрать цвет текста"
                            value={textColor}
                            onChange={(e) => {
                                const newColor = e.target.value;

                                setTextColor(newColor);
                                onTextColor(newColor);
                            }}
                            className='toolbarColorInput'
                            aria-label="Выбрать цвет текста"
                        />
                    </div>

                    {/* Кнопка для выбора цвета фона */}
                    <div className='colorPicker'>
                        <div className='iconWrapper' style={{ '--color': backgroundColor } as React.CSSProperties}>
                            <div className='topSection'>
                                <div className='backgroundIcon'></div>
                            </div>
                            <div className='bottomSection'></div>
                            {/* Отображение выбранного цвета */}
                        </div>
                        <input
                            type="color"
                            title="Выбрать цвет фона"
                            value={backgroundColor}
                            onChange={(e) => {
                                const newColor = e.target.value;

                                setBackgroundColor(newColor);
                                onBackgroundColor(newColor);
                            }}
                            className='toolbarColorInput'
                            aria-label="Выбрать цвет фона"
                        />
                    </div>
                </div>
            );
        };

        export default Toolbar;
