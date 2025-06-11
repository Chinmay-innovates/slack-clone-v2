import { cn } from "@/lib/utils";
import { createElement, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const typographyVariants = cva(
	"scroll-m-20 tracking-tight", // base styles
	{
		variants: {
			variant: {
				h1: "text-4xl font-extrabold lg:text-5xl",
				h2: "text-3xl font-bold lg:text-4xl",
				h3: "text-2xl font-semibold lg:text-3xl",
				h4: "text-xl font-medium lg:text-2xl",
				h5: "text-lg font-normal lg:text-xl",
				h6: "text-base font-normal lg:text-lg",
				p: "text-sm font-normal lg:text-base leading-relaxed",
				blockquote:
					"text-lg font-medium italic border-l-4 border-gray-300 pl-6 text-gray-700",
				lead: "text-xl font-normal leading-7 text-gray-600",
				large: "text-lg font-semibold",
				small: "text-sm font-medium leading-none",
				muted: "text-sm text-gray-500",
			},
			weight: {
				thin: "font-thin",
				extralight: "font-extralight",
				light: "font-light",
				normal: "font-normal",
				medium: "font-medium",
				semibold: "font-semibold",
				bold: "font-bold",
				extrabold: "font-extrabold",
				black: "font-black",
			},
			align: {
				left: "text-left",
				center: "text-center",
				right: "text-right",
				justify: "text-justify",
			},
			color: {
				default: "text-gray-900",
				muted: "text-gray-600",
				subtle: "text-gray-500",
				primary: "text-blue-600",
				secondary: "text-purple-600",
				success: "text-green-600",
				warning: "text-yellow-600",
				error: "text-red-600",
			},
		},
		defaultVariants: {
			variant: "p",
			weight: undefined,
			align: "left",
			color: "default",
		},
	}
);

interface TypographyProps extends VariantProps<typeof typographyVariants> {
	children?: ReactNode;
	text?: string;
	className?: string;
	asChild?: boolean;
}

// Component-specific HTML attributes based on variant
type TypographyHTMLProps<T extends keyof JSX.IntrinsicElements> =
	JSX.IntrinsicElements[T];

// Main component props
type Props = Omit<TypographyProps, "variant"> & {
	variant?: NonNullable<VariantProps<typeof typographyVariants>["variant"]>;
} & (
		| TypographyHTMLProps<"h1">
		| TypographyHTMLProps<"h2">
		| TypographyHTMLProps<"h3">
		| TypographyHTMLProps<"h4">
		| TypographyHTMLProps<"h5">
		| TypographyHTMLProps<"h6">
		| TypographyHTMLProps<"p">
		| TypographyHTMLProps<"blockquote">
	);

type TypographyTag =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "p"
	| "blockquote";

const getTag = (variant: string): TypographyTag => {
	switch (variant) {
		case "h1":
		case "h2":
		case "h3":
		case "h4":
		case "h5":
		case "h6":
			return variant;
		case "blockquote":
			return "blockquote";
		case "lead":
		case "large":
		case "small":
		case "muted":
		case "p":
		default:
			return "p";
	}
};

export const Typography = ({
	variant = "p",
	weight,
	align,
	color,
	children,
	text,
	className,
	asChild = false,
	...props
}: Props) => {
	const safeVariant = variant ?? "p";
	const Tag = getTag(safeVariant);

	const combinedClassName = cn(
		typographyVariants({ variant: safeVariant, weight, align, color }),
		className
	);

	// Support for both children and text prop
	const content = children || text;

	return createElement(
		Tag,
		{ className: combinedClassName, ...props },
		content
	);
};
