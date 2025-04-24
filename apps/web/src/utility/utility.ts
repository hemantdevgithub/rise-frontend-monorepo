import { TLessonStatus } from "@/types/lesson.type";

export function toNormalCase(str: string) {
  return str.replace(/[_-]/g, " ").replace(/\s+/g, " ").trim();
}
export const getLessonStatusLabel = (status: TLessonStatus): string => {
  switch (status) {
    case "DRAFT":
      return "Draft (not submitted)";
    case "PENDING_EDITOR_REVIEW":
      return "Pending editor review";
    case "IN_REVIEW_EDITOR":
      return "Under editor review";
    case "REVISIONS_REQUIRED_EDITOR":
      return "Revisions required";
    case "RESUBMITTED":
      return "Resubmitted";
    case "READY_FOR_FINAL_APPROVAL":
      return "Forwarded for final review";
    case "IN_FINAL_REVIEW":
      return "Under final review";
    case "REJECTED":
      return "Rejected by admin";
    case "PUBLISHED":
      return "Published";
    default:
      return toNormalCase(status); // fallback for any unknown/new statuses
  }
};
export const extractHighlightOrAbstract = (html: string, maxLength = 160) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const boldText = doc.querySelector("strong, b")?.textContent;
  const plainText = doc.body.textContent || "";

  const abstract = boldText || plainText;
  return abstract.length > maxLength
    ? abstract.slice(0, maxLength) + "..."
    : abstract;
};
export const stripInlineStyles = (html: string) => {
  return html.replace(/style="[^"]*"/g, "");
};
