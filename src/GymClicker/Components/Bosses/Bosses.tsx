import { useCallback, useEffect, useState } from "react";
import { bosses } from "./constants/bosses";
import Image from "next/image";
import * as SC from "./styled"; // Importe o styled.ts
import { MuscleButton } from "@styles/gym-clicker.styled";

type BossesProps = {
	hit: number;
};

export const Bosses = ({ hit }: BossesProps) => {
	const [activeBossIndex, setActiveBossIndex] = useState(0);
	const [shouldAppear, setShouldAppear] = useState(true);

	const [bossLife, setBossLife] = useState(bosses[activeBossIndex].life);
	const [nextBossTime, setNextBossTime] = useState(
		bosses[activeBossIndex].time
	);
	const [isAttacking, setIsAttacking] = useState(false);
	const currentBoss = bosses[activeBossIndex];
	const lifePercentage = (bossLife / currentBoss.life) * 100;

	const triggerAttackAnimation = useCallback(() => {
		setIsAttacking(true);
		const attackDuration = 600;
		setTimeout(() => {
			setIsAttacking(false);
		}, attackDuration);
	}, []);

	const timeCounter = useCallback(() => {
		return setInterval(() => {
			if (nextBossTime > 0) {
				setNextBossTime((time) => time - 1);
			}
		}, 1000);
	}, [nextBossTime]);

	const handlePlayerHit = () => {
		if (bossLife <= 0) {
			if (bosses[activeBossIndex + 1]) {
				setActiveBossIndex(activeBossIndex + 1);
				setNextBossTime(bosses[activeBossIndex + 1].time);
				setBossLife(bosses[activeBossIndex + 1].life);
				return;
			}

			setShouldAppear(false);
		}
		setBossLife((bossLife) => bossLife - hit);
	};

	useEffect(() => {
		let attackInterval: NodeJS.Timeout;
		if (nextBossTime <= 0) {
			attackInterval = setInterval(() => {
				triggerAttackAnimation();
			}, 3000);
		}

		return () => clearInterval(attackInterval);
	}, [nextBossTime, triggerAttackAnimation]);

	useEffect(() => {
		const interval = timeCounter();

		return () => clearInterval(interval);
	}, [timeCounter]);

	return (
		<>
			{nextBossTime > 0 && <SC.TimeContainer>{nextBossTime}</SC.TimeContainer>}

			{/* Exibe o boss quando o tempo chega a zero */}
			{nextBossTime <= 0 && shouldAppear && (
				<SC.BossesContainer>
					<SC.ImageContainer $isAttacking={isAttacking}>
						{" "}
						{/* Passa a prop isAttacking */}
						<Image
							src={currentBoss.image}
							alt={`boss ${currentBoss.name} image`}
							width={200}
							height={500}
						/>
					</SC.ImageContainer>
					<SC.LifeContainer $lifePercentage={String(lifePercentage)}>
						<span>
							{bossLife} / {currentBoss.life}
						</span>
					</SC.LifeContainer>
					<MuscleButton onClick={handlePlayerHit}>👊 Hit 👊</MuscleButton>
				</SC.BossesContainer>
			)}
		</>
	);
};
