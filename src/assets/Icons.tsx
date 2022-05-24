import { DetailedHTMLProps, FC, SVGAttributes, SVGProps } from "react";

export const DropDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="h-4 w-4 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    {...props}
  >
    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
  </svg>
);

export const AccordionIcon: FC<
  DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & {
    isOpen: boolean;
  }
> = ({ isOpen, ...props }) => (
  <svg aria-hidden height="10" width="10" {...props}>
    {isOpen ? (
      <polygon points="0,4 10,4 5,9" fill="currentColor" />
    ) : (
      <polygon points="3,0 8,5 3,10" fill="currentColor" />
    )}
  </svg>
);

export const PaginationBackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export const PaginationNextIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 text-grey-500 fill-current"
    {...props}
  >
    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
  </svg>
);

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      fill="currentColor"
      d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z"
      transform="translate(-5 -5)"
    />
  </svg>
);

export const ClassicSpinnerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export const SunflowerSpinnerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48.004 48.003"
    {...props}
  >
    <g
      id="Group_1442"
      data-name="Group 1442"
      transform="translate(2893.161 1510)"
    >
      <path
        id="Path_472"
        data-name="Path 472"
        d="M29.588,20.657a8.932,8.932,0,1,1-8.932-8.932,8.933,8.933,0,0,1,8.932,8.932"
        transform="translate(-2889.817 -1506.656)"
        fill="#2c2c2c"
      />
      <path
        id="Path_473"
        data-name="Path 473"
        d="M15.3,5.993A11.879,11.879,0,0,1,18.489,0c2.324,2.713,3.719,5.524,3.182,9A6.781,6.781,0,0,1,19.4,13.083a1.175,1.175,0,0,1-1.829.015,7.263,7.263,0,0,1-2.269-7.1"
        transform="translate(-2887.628 -1510)"
        fill="#386363"
      />
      <path
        id="Path_474"
        data-name="Path 474"
        d="M9.142,9.13A11.87,11.87,0,0,1,8.9,2.348c3.368,1.186,5.982,2.923,7.253,6.2a6.77,6.77,0,0,1,.078,4.672,1.174,1.174,0,0,1-1.577.928A7.264,7.264,0,0,1,9.142,9.13"
        transform="translate(-2890.047 -1509.143)"
        fill="#386363"
      />
      <path
        id="Path_475"
        data-name="Path 475"
        d="M5.96,14.62a11.887,11.887,0,0,1-3.6-5.754c3.51-.657,6.643-.46,9.383,1.742a6.774,6.774,0,0,1,2.4,4.008,1.174,1.174,0,0,1-.9,1.592A7.262,7.262,0,0,1,5.96,14.62"
        transform="translate(-2892.298 -1506.884)"
        fill="#386363"
      />
      <path
        id="Path_476"
        data-name="Path 476"
        d="M5.993,21.632A11.879,11.879,0,0,1,0,18.447c2.713-2.324,5.524-3.719,9-3.182a6.781,6.781,0,0,1,4.085,2.269,1.175,1.175,0,0,1,.015,1.829,7.263,7.263,0,0,1-7.1,2.269"
        transform="translate(-2893.161 -1504.468)"
        fill="#386363"
      />
      <path
        id="Path_477"
        data-name="Path 477"
        d="M9.13,28.182a11.882,11.882,0,0,1-6.782.238c1.186-3.368,2.923-5.982,6.2-7.253a6.77,6.77,0,0,1,4.672-.078,1.173,1.173,0,0,1,.928,1.575A7.266,7.266,0,0,1,9.13,28.182"
        transform="translate(-2892.303 -1502.436)"
        fill="#386363"
      />
      <path
        id="Path_478"
        data-name="Path 478"
        d="M14.62,32.368a11.887,11.887,0,0,1-5.754,3.6c-.657-3.51-.46-6.643,1.742-9.383a6.774,6.774,0,0,1,4.008-2.4,1.174,1.174,0,0,1,1.592.9,7.262,7.262,0,0,1-1.588,7.287"
        transform="translate(-2890.044 -1501.19)"
        fill="#386363"
      />
      <path
        id="Path_479"
        data-name="Path 479"
        d="M21.633,32.788a11.879,11.879,0,0,1-3.185,5.993c-2.324-2.713-3.719-5.524-3.182-9A6.786,6.786,0,0,1,17.533,25.7a1.175,1.175,0,0,1,1.829-.015,7.261,7.261,0,0,1,2.27,7.1"
        transform="translate(-2887.627 -1500.778)"
        fill="#386363"
      />
      <path
        id="Path_480"
        data-name="Path 480"
        d="M28.183,29.2a11.882,11.882,0,0,1,.238,6.782c-3.368-1.186-5.982-2.923-7.253-6.2a6.777,6.777,0,0,1-.079-4.672,1.175,1.175,0,0,1,1.577-.928A7.266,7.266,0,0,1,28.183,29.2"
        transform="translate(-2885.597 -1501.187)"
        fill="#386363"
      />
      <path
        id="Path_481"
        data-name="Path 481"
        d="M32.368,22.7a11.887,11.887,0,0,1,3.6,5.754c-3.51.657-6.643.46-9.383-1.742a6.774,6.774,0,0,1-2.4-4.008,1.174,1.174,0,0,1,.9-1.592A7.262,7.262,0,0,1,32.368,22.7"
        transform="translate(-2884.351 -1502.433)"
        fill="#386363"
      />
      <path
        id="Path_482"
        data-name="Path 482"
        d="M32.788,15.3a11.879,11.879,0,0,1,5.993,3.185c-2.713,2.324-5.524,3.719-9,3.182A6.781,6.781,0,0,1,25.7,19.4a1.175,1.175,0,0,1-.015-1.829,7.263,7.263,0,0,1,7.1-2.269"
        transform="translate(-2883.938 -1504.467)"
        fill="#386363"
      />
      <path
        id="Path_483"
        data-name="Path 483"
        d="M29.2,9.142A11.87,11.87,0,0,1,35.985,8.9c-1.186,3.368-2.923,5.982-6.2,7.253a6.77,6.77,0,0,1-4.672.078,1.174,1.174,0,0,1-.928-1.577A7.264,7.264,0,0,1,29.2,9.142"
        transform="translate(-2884.348 -1506.886)"
        fill="#386363"
      />
      <path
        id="Path_484"
        data-name="Path 484"
        d="M22.7,5.96a11.887,11.887,0,0,1,5.754-3.6c.657,3.51.46,6.643-1.742,9.383a6.774,6.774,0,0,1-4.008,2.4,1.174,1.174,0,0,1-1.592-.9A7.262,7.262,0,0,1,22.7,5.96"
        transform="translate(-2885.594 -1509.137)"
        fill="#386363"
      />
    </g>
  </svg>
);
