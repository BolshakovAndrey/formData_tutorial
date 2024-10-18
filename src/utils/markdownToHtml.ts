/**
 * Преобразует Markdown-синтаксис в HTML.
 * @param markdown - Строка с Markdown.
 * @returns Преобразованная строка с HTML.
 */
export function markdownToHtml(markdown: string): string {
    let html = markdown;

    // Жирный текст: **текст** или __текст__
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Курсив: *текст* или _текст_
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Подчеркивание: <u>текст</u>
    html = html.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>');

    // Зачеркнутый текст: ~~текст~~
    html = html.replace(/~~(.*?)~~/g, '<s>$1</s>');

    // Перенос строки для каждого абзаца
    html = html.replace(/\n/g, '<br/>');

    return html;
}
