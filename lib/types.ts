/* TYPE DEFINITIONS
 * =================
 * This file contains type definitions for the project.
 * It is used to define types that are used throughout the project,
 * such as props for components, types for API responses, etc.
 */

export type IconProps = React.SVGProps<SVGSVGElement>;
export type ModalType = "phone" | "email" | "meeting" | "chat" | null;
export type SubModalType = "liveChat" | null;

export interface DropdownItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  subtitle: string;
  action: () => void;
}
