import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export function PhoneIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 25.625 25.625"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      {...props}
    >
      <path d="M22.079 17.835c-1.548-1.324-3.119-2.126-4.648-.804l-.913.799c-.668.58-1.91 3.29-6.712-2.234C5.005 10.079 7.862 9.22 8.531 8.645l.918-.8c1.521-1.325.947-2.993-.15-4.71l-.662-1.04C7.535.382 6.335-.743 4.81.58l-.824.72C3.312 1.791 1.428 3.387.971 6.419c-.55 3.638 1.185 7.804 5.16 12.375 3.97 4.573 7.857 6.87 11.539 6.83 3.06-.033 4.908-1.675 5.486-2.272l.827-.721c1.521-1.322.576-2.668-.973-3.995l-.931-.801z" />
    </svg>
  );
}
