/**
 * Преобразует HTML-теги в Markdown-синтаксис.
 * @param html - Строка с HTML.
 * @returns Преобразованная строка с Markdown.
 */
export function htmlToMarkdown(html: string): string {
    let markdown = html;

    // Жирный текст: <strong>текст</strong>
    markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, '**$1**');

    // Курсив: <em>текст</em>
    markdown = markdown.replace(/<em>(.*?)<\/em>/g, '*$1*');

    // Подчеркивание: <u>текст</u>
    markdown = markdown.replace(/<u>(.*?)<\/u>/g, '__$1__');

    // Зачеркнутый текст: <s>текст</s>
    markdown = markdown.replace(/<s>(.*?)<\/s>/g, '~~$1~~');

    // Перенос строки
    markdown = markdown.replace(/<br\/>/g, '\n');

    return markdown;
}
