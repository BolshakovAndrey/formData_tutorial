import React, {useRef, useEffect, useState, useCallback} from 'react';
import { marked } from 'marked';
import TurndownService from 'turndown';
import DOMPurify from 'dompurify';
import Toolbar from './Toolbar/Toolbar'


// Инициализация Turndown
const turndownService = new TurndownService();

/**
 * Функция для преобразования Markdown в HTML.
 * Используем библиотеку 'marked' для надежного преобразования.
 * @param markdown - Строка с Markdown.
 * @returns Преобразованная строка с HTML.
 */
function markdownToHtml(markdown: string): string {
    return marked.parse(markdown) as string;
}

/**
 * Функция для преобразования HTML в Markdown.
 * Используем библиотеку 'turndown' для надежного преобразования.
 * @param html - Строка с HTML.
 * @returns Преобразованная строка с Markdown.
 */
function htmlToMarkdown(html: string): string {
    return turndownService.turndown(html);
}

function EditableFormWithToolbar() {
    // Создаем рефы для скрытого input и редактируемого div
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const editableDivRef = useRef<HTMLDivElement>(null);

    // Состояние для хранения HTML-содержимого
    const [htmlContent, setHtmlContent] = useState<string>('Введите текст');

    // Реф для отслеживания количества перерендеров
    const renderCountRef = useRef<number>(0);
    renderCountRef.current += 1;
    console.log(`EditableFormWithToolbar render count: ${renderCountRef.current}`);

    /**
     * Обработчик изменения содержимого в режиме HTML.
     */
    const handleHtmlChange = useCallback(() => {
        if (editableDivRef.current && hiddenInputRef.current) {
            const sanitizedHtml = DOMPurify.sanitize(editableDivRef.current.innerHTML);
            setHtmlContent(sanitizedHtml);
            hiddenInputRef.current.value = sanitizedHtml;
        }
    }, []);

    /**
     * Функция для применения команд форматирования.
     * @param command - Команда, например 'bold', 'italic', 'strikeThrough'.
     * @param value - Дополнительное значение для команды, если требуется.
     */
    const applyCommand = useCallback((command: string, value?: string) => {
        document.execCommand(command, false, value);
        handleHtmlChange(); // Обновляем состояние после применения команды
    }, [handleHtmlChange]);

    /**
     * Обработчик сабмита формы.
     * Собирает данные формы и выводит их в консоль.
     */
    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        console.log(formValues);
    }, []);

    /**
     * Эффект для инициализации содержимого и синхронизации hidden input при загрузке компонента.
     */
    useEffect(() => {
        if (editableDivRef.current && hiddenInputRef.current) {
            const sanitizedHtml = DOMPurify.sanitize(editableDivRef.current.innerHTML);
            hiddenInputRef.current.value = sanitizedHtml;
            setHtmlContent(sanitizedHtml);
        }
    }, []);

    return (
        <>
            <p>Editable Form with Toolbar</p>
            <form onSubmit={handleSubmit}>
                {/* Скрытый input для передачи содержимого editable div */}
                <input
                    type="hidden"
                    name="content"
                    ref={hiddenInputRef}
                    value={htmlContent}/>
                {/* Панель инструментов для форматирования текста */}
                <Toolbar
                    onBold={() => applyCommand('bold')}
                    onItalic={() => applyCommand('italic')}
                    onUnderline={() => applyCommand('underline')}
                    onStrikeThrough={() => applyCommand('strikeThrough')}
                    onBulletList={() => applyCommand('insertUnorderedList')}
                    onNumberedList={() => applyCommand('insertOrderedList')}
                    onTextColor={(color: string) => applyCommand('foreColor', color)}
                    onBackgroundColor={(color: string) => applyCommand('hiliteColor', color)}
                />
                {/* Редактируемый div */}
                <div
                    ref={editableDivRef}
                    className="textArea"
                    contentEditable="true"
                    onInput={handleHtmlChange}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        minHeight: '100px',
                        width: '100%',
                        overflow: 'auto',
                        marginBottom: '10px',
                    }}
                ></div>
                {/* Кнопка сабмита */}
                <button type="submit">Сохранить</button>
            </form>
        </>
    );
}

export default EditableFormWithToolbar;
