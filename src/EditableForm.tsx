import React, { useRef, useEffect, useState } from 'react';
import { marked } from 'marked';
import TurndownService from 'turndown';
import DOMPurify from 'dompurify';

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
 * Функция для преобразования HTML в Markdown.
 * Используем библиотеку 'turndown' для надежного преобразования.
 * @param html - Строка с HTML.
 * @returns Преобразованная строка с Markdown.
 */
function htmlToMarkdown(html: string): string {
    return turndownService.turndown(html);
}

function EditableForm() {
    // Создаем рефы для скрытого input и редактируемого div
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const editableDivRef = useRef<HTMLDivElement>(null);

    // Состояние для отображения Markdown
    const [isMarkdownMode, setIsMarkdownMode] = useState<boolean>(false);
    const [markdownText, setMarkdownText] = useState<string>('');
    const [htmlContent, setHtmlContent] = useState<string>('');

    /**
     * Обработчик изменения содержимого в режиме Markdown.
     */
    const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdownText(e.target.value);
    };

    /**
     * Обработчик изменения содержимого в режиме HTML.
     */
    const handleHtmlChange = () => {
        if (editableDivRef.current) {
            const sanitizedHtml = DOMPurify.sanitize(editableDivRef.current.innerHTML);
            setHtmlContent(sanitizedHtml);
            if (hiddenInputRef.current) {
                hiddenInputRef.current.value = sanitizedHtml;
            }
        }
    };

    /**
     * Переключение между режимами редактирования Markdown и HTML.
     */
    const toggleMarkdownMode = () => {
        if (isMarkdownMode) {
            // Преобразуем Markdown в HTML
            const html = markdownToHtml(markdownText);
            const sanitizedHtml = DOMPurify.sanitize(html);
            setHtmlContent(sanitizedHtml);
            if (editableDivRef.current) {
                editableDivRef.current.innerHTML = sanitizedHtml;
            }
            if (hiddenInputRef.current) {
                hiddenInputRef.current.value = sanitizedHtml;
            }
        } else {
            // Преобразуем HTML в Markdown
            if (editableDivRef.current) {
                const html = editableDivRef.current.innerHTML;
                const markdown = htmlToMarkdown(html);
                setMarkdownText(markdown);
            }
        }
        setIsMarkdownMode(!isMarkdownMode);
    };

    /**
     * Обработчик сабмита формы.
     * Собирает данные формы и выводит их в консоль.
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Собирает данные с помощью FormData
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        console.log(formValues);
    };


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

    /**
     * Эффект для обновления hidden input при изменении htmlContent.
     */
    useEffect(() => {
        if (hiddenInputRef.current) {
            hiddenInputRef.current.value = htmlContent;
        }
    }, [htmlContent]);

    /**
     * Эффект для обновления содержимого contentEditable div при изменении htmlContent и выходе из режима Markdown.
     */
    useEffect(() => {
        if (!isMarkdownMode && editableDivRef.current) {
            editableDivRef.current.innerHTML = htmlContent;
        }
    }, [htmlContent, isMarkdownMode]);

    return (
        <form onSubmit={handleSubmit}>
            {/* Скрытый input для передачи содержимого editable div */}
            <input
                type="hidden"
                name="content"
                ref={hiddenInputRef}
                value={htmlContent}
            />
            {/* Кнопка для переключения режимов */}
            <button type="button" onClick={toggleMarkdownMode} style={{ marginBottom: '10px' }}>
                {isMarkdownMode ? 'Выйти из Markdown режима' : 'Редактировать в Markdown'}
            </button>
            {/* Редактируемый div или textarea для Markdown */}
            {isMarkdownMode ? (
                <textarea
                    ref={markdownRef}
                    value={markdownText}
                    onChange={handleMarkdownChange}
                    placeholder="Введите текст в Markdown"
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        minHeight: '100px',
                        width: '100%',
                        resize: 'vertical',
                        marginBottom: '10px',
                        fontFamily: 'monospace',
                    }}
                />
            ) : (
                <div
                    ref={editableDivRef}
                    className="textArea"
                    contentEditable="true"
                    onInput={handleHtmlChange}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        minHeight: '20px',
                        minWidth: '50px',
                        marginBottom: '10px',
                    }}
                />
            )}
            {/* Кнопка сабмита */}
            <button type="submit">Сохранить</button>
        </form>
    );
}

export default EditableForm;
