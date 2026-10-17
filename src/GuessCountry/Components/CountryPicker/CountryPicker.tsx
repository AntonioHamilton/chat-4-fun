import { useState } from "react";
import { guessCountryTranslations } from "@/Translations/guessCountry";
import * as Shared from "@/styles/guess-country.styled";
import { COUNTRIES_PER_PLAYER } from "../../Constants/countries";
import { randomCountries } from "../../Utils/countries";
import { CountrySearch } from "../CountrySearch/CountrySearch";
import * as SC from "./styled";

type CountryPickerProps = {
	t: (typeof guessCountryTranslations)["PT_BR"];
	waiting: boolean;
	onSubmit: (countries: string[]) => void;
};

type Slot = { name: string; confirmed: boolean } | null;

const emptySlots = (): Slot[] =>
	Array.from({ length: COUNTRIES_PER_PLAYER }, () => null);

export const CountryPicker = ({ t, waiting, onSubmit }: CountryPickerProps) => {
	const [slots, setSlots] = useState<Slot[]>(emptySlots);
	const [dragIndex, setDragIndex] = useState<number | null>(null);
	const [overIndex, setOverIndex] = useState<number | null>(null);

	const chosen = slots.flatMap((slot) => (slot ? [slot.name] : []));
	const allConfirmed = slots.every((slot) => slot?.confirmed);

	const updateSlot = (index: number, value: Slot) =>
		setSlots((current) =>
			current.map((slot, i) => (i === index ? value : slot))
		);

	const swap = (from: number, to: number) =>
		setSlots((current) => {
			const next = [...current];
			[next[from], next[to]] = [next[to], next[from]];
			return next;
		});

	const pickRandom = () =>
		setSlots((current) => {
			const kept = current.filter((slot) => slot?.confirmed);
			const extra = randomCountries(
				COUNTRIES_PER_PLAYER - kept.length,
				kept.map((slot) => slot?.name ?? "")
			);
			return current.map((slot) =>
				slot?.confirmed
					? slot
					: { name: extra.pop() as string, confirmed: true }
			);
		});

	const endDrag = () => {
		setDragIndex(null);
		setOverIndex(null);
	};

	if (waiting) {
		return (
			<Shared.Panel>
				<SC.Status>{t.waitingPicks}</SC.Status>
			</Shared.Panel>
		);
	}

	return (
		<Shared.Panel>
			<Shared.PanelTitle>{t.pickTitle}</Shared.PanelTitle>
			<SC.Hint>{t.pickHint}</SC.Hint>

			<SC.Slots>
				{slots.map((slot, index) => (
					<SC.Slot
						key={index}
						$state={!slot ? "empty" : slot.confirmed ? "confirmed" : "draft"}
						$over={overIndex === index && dragIndex !== index}
						draggable={!!slot}
						onDragStart={() => setDragIndex(index)}
						onDragOver={(event) => {
							if (dragIndex === null) return;
							event.preventDefault();
							setOverIndex(index);
						}}
						onDrop={(event) => {
							event.preventDefault();
							if (dragIndex !== null && dragIndex !== index) {
								swap(dragIndex, index);
							}
							endDrag();
						}}
						onDragEnd={endDrag}
					>
						<SC.SlotIndex>{index + 1}</SC.SlotIndex>

						{!slot && (
							<CountrySearch
								label={`${t.slot} ${index + 1}`}
								placeholder={`${t.slot} ${index + 1} · ${t.searchPlaceholder}`}
								noResultsLabel={t.noResults}
								exclude={chosen}
								clearOnPick
								onPick={(name) => updateSlot(index, { name, confirmed: false })}
							/>
						)}

						{slot && (
							<>
								<SC.Grip aria-hidden="true" title={t.drag}>
									⠿
								</SC.Grip>
								<SC.SlotName>{slot.name}</SC.SlotName>
								<SC.SlotActions>
									<SC.SmallButton
										type="button"
										aria-label={t.moveUp}
										disabled={index === 0}
										onClick={() => swap(index, index - 1)}
									>
										↑
									</SC.SmallButton>
									<SC.SmallButton
										type="button"
										aria-label={t.moveDown}
										disabled={index === COUNTRIES_PER_PLAYER - 1}
										onClick={() => swap(index, index + 1)}
									>
										↓
									</SC.SmallButton>
									{!slot.confirmed && (
										<>
											<SC.SmallButton
												type="button"
												$variant="confirm"
												onClick={() =>
													updateSlot(index, { ...slot, confirmed: true })
												}
											>
												{t.confirm}
											</SC.SmallButton>
											<SC.SmallButton
												type="button"
												onClick={() => updateSlot(index, null)}
											>
												{t.remove}
											</SC.SmallButton>
										</>
									)}
								</SC.SlotActions>
							</>
						)}
					</SC.Slot>
				))}
			</SC.Slots>

			<SC.Footer>
				<Shared.GhostButton type="button" onClick={pickRandom}>
					{t.randomPick}
				</Shared.GhostButton>
				<Shared.PrimaryButton
					type="button"
					disabled={!allConfirmed}
					onClick={() => onSubmit(chosen)}
				>
					{t.ready}
				</Shared.PrimaryButton>
			</SC.Footer>
		</Shared.Panel>
	);
};
