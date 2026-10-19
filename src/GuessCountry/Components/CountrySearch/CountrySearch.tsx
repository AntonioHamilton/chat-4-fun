import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { NameLanguage } from "../../Types/game.types";
import {
	countryName,
	findCountry,
	searchCountries
} from "../../Utils/countries";
import { CountryFlag } from "../CountryFlag/CountryFlag";
import * as SC from "./styled";

type CountrySearchProps = {
	label: string;
	placeholder: string;
	noResultsLabel: string;
	language?: NameLanguage;
	exclude?: string[];
	disabled?: boolean;
	clearOnPick?: boolean;
	resetKey?: unknown;
	onPick?: (country: string) => void;
	onValueChange?: (country: string | null) => void;
	onSubmit?: () => void;
};

export const CountrySearch = ({
	label,
	placeholder,
	noResultsLabel,
	language = "PT_BR",
	exclude = [],
	disabled = false,
	clearOnPick = false,
	resetKey,
	onPick,
	onValueChange,
	onSubmit
}: CountrySearchProps) => {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [placement, setPlacement] = useState({ up: false, maxHeight: 240 });
	const wrapperRef = useRef<HTMLDivElement>(null);
	const excludeKey = exclude.join("|");

	const results = useMemo(
		() => searchCountries(query, exclude, language),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[query, excludeKey, language]
	);

	useEffect(() => {
		if (!open || !wrapperRef.current) return;
		const rect = wrapperRef.current.getBoundingClientRect();
		const below = window.innerHeight - rect.bottom - 16;
		const above = rect.top - 16;
		const up = below < 180 && above > below;
		setPlacement({
			up,
			maxHeight: Math.max(120, Math.min(240, up ? above : below))
		});
	}, [open, results.length]);

	useEffect(() => {
		setQuery("");
		setOpen(false);
	}, [resetKey]);

	useEffect(() => {
		const handleOutside = (event: MouseEvent) => {
			if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
		};
		document.addEventListener("mousedown", handleOutside);
		return () => document.removeEventListener("mousedown", handleOutside);
	}, []);

	const pick = (country: string) => {
		setQuery(clearOnPick ? "" : countryName(country, language));
		setOpen(false);
		setActiveIndex(0);
		onValueChange?.(clearOnPick ? null : country);
		onPick?.(country);
	};

	const handleChange = (value: string) => {
		setQuery(value);
		setOpen(true);
		setActiveIndex(0);
		onValueChange?.(findCountry(value));
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setOpen(true);
			setActiveIndex((index) => Math.min(index + 1, results.length - 1));
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			setActiveIndex((index) => Math.max(index - 1, 0));
		} else if (event.key === "Escape") {
			setOpen(false);
		} else if (event.key === "Enter") {
			event.preventDefault();
			const active = results[activeIndex];
			if (open && active && countryName(active, language) !== query) {
				pick(active);
			} else {
				onSubmit?.();
			}
		}
	};

	return (
		<SC.Wrapper ref={wrapperRef}>
			<SC.Input
				type="text"
				role="combobox"
				aria-label={label}
				aria-expanded={open}
				aria-autocomplete="list"
				autoComplete="off"
				placeholder={placeholder}
				value={query}
				disabled={disabled}
				onChange={(event) => handleChange(event.target.value)}
				onFocus={() => setOpen(true)}
				onKeyDown={handleKeyDown}
			/>
			{open && !disabled && (
				<SC.List
					role="listbox"
					$up={placement.up}
					$maxHeight={placement.maxHeight}
				>
					{results.length === 0 && <SC.Empty>{noResultsLabel}</SC.Empty>}
					{results.map((country, index) => (
						<SC.Option
							key={country}
							role="option"
							aria-selected={index === activeIndex}
							$active={index === activeIndex}
							onMouseDown={(event) => event.preventDefault()}
							onClick={() => pick(country)}
							onMouseEnter={() => setActiveIndex(index)}
						>
							<CountryFlag country={country} />
							{countryName(country, language)}
						</SC.Option>
					))}
				</SC.List>
			)}
		</SC.Wrapper>
	);
};
