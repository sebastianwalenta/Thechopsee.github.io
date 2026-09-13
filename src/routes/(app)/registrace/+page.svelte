<script>
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';

	const registrationDeadline = new Date(2026, 8, 22, 23, 59, 59);
	const steps = [
		'Závodník',
		'NSS',
		'RG650',
		'Footy',
		'Rekapitulace'
	];
	const nssCategories = ['NSS-A', 'NSS-B', 'NSS-C'];
	const isoOptions = ['CZE', 'SVK', 'PLN', 'OTHER'];
	/** @type {Array<{name: string, age: string, country: string, nss: string, rg: string, footy: string}>} */
	const initialRegistrants = [];

	const createInitialForm = () => ({
		firstName: '',
		lastName: '',
		ageGroup: '18+',
		email: '',
		club: '',
		license: '',
		country: 'CZE',
		customCountry: '',
		accommodation: false,
		accommodationPersons: 1,
		attendsNss: false,
		nssCategory: 'NSS-A',
		nssBoatName: '',
		nssScale: 10,
		nssDisplacement: 1,
		nssSailArea: 1,
		nssWaterline: 1,
		attendsRg: false,
		rgSailNumber: '',
		attendsFooty: false,
		footySailNumber: '',
		summaryConfirmed: false,
		marketingConsent: false,
		gdprConsent: false
	});

	let step = $state(0);
	let form = $state(createInitialForm());
	/** @type {string[]} */
	let errors = $state([]);
	let submitted = $state(false);
	let submitting = $state(false);
	let registrants = $state([...initialRegistrants]);
	let stats = $state({
		pocet_ucastniku: 0,
		pocet_rg: 0,
		pocet_maket: 0,
		pocet_footy: 0
	});
	let countdown = $state(getCountdown());

	const registrationClosed = $derived(countdown.closed);
	const countryCode = $derived(
		form.country === 'OTHER' ? form.customCountry.trim().toUpperCase() : form.country
	);
	const hasBoat = $derived(form.attendsNss || form.attendsRg || form.attendsFooty);
	const countdownLabel = $derived(
		registrationClosed ? 'Registrace byla ukončena' : 'Registrace končí za'
	);

	onMount(() => {
		const interval = setInterval(() => {
			countdown = getCountdown();
		}, 1000);

		// Fetch registrants from endpoint
		fetchRegistrants();

		return () => clearInterval(interval);
	});

	async function fetchRegistrants() {
		try {
			const response = await fetch('https://dataspracovavac.tode.cz/tableendpoint.php');
			if (response.ok) {
				const data = await response.json();
				if (data.statistiky) {
					stats = {
						pocet_ucastniku: data.statistiky.pocet_ucastniku ?? 0,
						pocet_rg: data.statistiky.pocet_rg ?? 0,
						pocet_maket: data.statistiky.pocet_maket ?? 0,
						pocet_footy: data.statistiky.pocet_footy ?? 0
					};
				}
				registrants = (data.zavodnici || []).map((/** @type {any} */ zavodnik) => ({
					name: zavodnik.cele_jmeno,
					age: zavodnik.vek,
					country: zavodnik.stat,
					nss: zavodnik.kategorie !== '-' ? `${zavodnik.kategorie} / ${zavodnik.nazev_modelu}` : '-',
					rg: zavodnik.rg_text ?? (zavodnik.rg ? 'Ano' : '-'),
					footy: zavodnik.footy ?? '-'
				}));
			} else {
				console.error('Failed to fetch registrants:', response.status);
			}
		} catch (error) {
			console.error('Error fetching registrants:', error);
		}
	}

	function getCountdown() {
		const diff = registrationDeadline.getTime() - Date.now();

		if (diff <= 0) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0, closed: true };
		}

		return {
			days: Math.floor(diff / 86_400_000),
			hours: Math.floor((diff / 3_600_000) % 24),
			minutes: Math.floor((diff / 60_000) % 60),
			seconds: Math.floor((diff / 1_000) % 60),
			closed: false
		};
	}

	/** @param {number} value */
	function formatCounter(value) {
		return String(value).padStart(2, '0');
	}

	/**
	 * @param {boolean} condition
	 * @param {string} message
	 * @param {string[]} bucket
	 */
	function addError(condition, message, bucket) {
		if (condition) {
			bucket.push(message);
		}
	}

	function validateCurrentStep(currentStep = step) {
		/** @type {string[]} */
		const bucket = [];

		if (registrationClosed) {
			bucket.push('Registrace už byla ukončena.');
			errors = bucket;
			return false;
		}

		if (currentStep === 0) {
			addError(!form.firstName.trim(), 'Vyplňte jméno.', bucket);
			addError(
				/\s/.test(form.firstName.trim()),
				'Jméno smí obsahovat pouze jedno slovo.',
				bucket
			);
			addError(!form.lastName.trim(), 'Vyplňte příjmení.', bucket);
			addError(
				/\s/.test(form.lastName.trim()),
				'Příjmení smí obsahovat pouze jedno slovo.',
				bucket
			);
			addError(!form.email.trim(), 'Vyplňte e-mail.', bucket);
			addError(
				form.email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
				'E-mail nemá platný formát.',
				bucket
			);
			addError(form.country === 'OTHER' && countryCode.length !== 3, 'ISO státu musí mít 3 znaky.', bucket);
			addError(form.accommodation && Number(form.accommodationPersons) < 1, 'Počet osob pro ubytování musí být alespoň 1.', bucket);
		}

		if (currentStep === 1 && form.attendsNss) {
			addError(!form.nssBoatName.trim(), 'U NSS vyplňte název lodi.', bucket);
			addError(!nssCategories.includes(form.nssCategory), 'Vyberte NSS kategorii.', bucket);
			addError(Number(form.nssScale) < 1 || Number(form.nssScale) > 50, 'Měřítko musí být mezi 1 a 50.', bucket);
			addError(
				!/^\d+(\.\d)?$/.test(String(form.nssScale)),
				'Měřítko může mít nejvýše jedno desetinné místo.',
				bucket
			);
			addError(
				Number(form.nssDisplacement) < 0 || Number(form.nssDisplacement) > 100,
				'Výtlak musí být mezi 0 a 100 kg.',
				bucket
			);
			addError(
				!/^\d+(\.\d{1,3})?$/.test(String(form.nssDisplacement)),
				'Výtlak může mít nejvýše tři desetinná místa.',
				bucket
			);
			addError(
				Number(form.nssSailArea) < 0 || Number(form.nssSailArea) > 50,
				'Plocha plachet musí být mezi 0 a 50 m2.',
				bucket
			);
			addError(
				!/^\d+(\.\d{1,3})?$/.test(String(form.nssSailArea)),
				'Plocha plachet může mít nejvýše tři desetinná místa.',
				bucket
			);
			addError(
				Number(form.nssWaterline) < 0 || Number(form.nssWaterline) > 4000,
				'Délka vodorysky musí být mezi 0 a 4000 mm.',
				bucket
			);
			addError(
				!/^\d+(\.\d{1,3})?$/.test(String(form.nssWaterline)),
				'Délka vodorysky může mít nejvýše tři desetinná místa.',
				bucket
			);
		}

		if (currentStep === 2 && form.attendsRg && form.rgSailNumber) {
			addError(
				!Number.isInteger(Number(form.rgSailNumber)) ||
					Number(form.rgSailNumber) < 1 ||
					Number(form.rgSailNumber) > 999,
				'RG650 číslo na plachtě musí být celé číslo 1 až 999.',
				bucket
			);
		}

		if (currentStep === 3) {
			if (form.attendsFooty && form.footySailNumber) {
				addError(
					!Number.isInteger(Number(form.footySailNumber)) ||
						Number(form.footySailNumber) < 1 ||
						Number(form.footySailNumber) > 999,
					'Footy číslo na plachtě musí být celé číslo 1 až 999.',
					bucket
				);
			}
			addError(!hasBoat, 'Vyberte alespoň jednu loď: NSS, RG650 nebo Footy.', bucket);
		}

		if (currentStep === 4) {
			addError(!hasBoat, 'Vyberte alespoň jednu loď: NSS, RG650 nebo Footy.', bucket);
			addError(!form.summaryConfirmed, 'Potvrďte správnost zadaných údajů.', bucket);
			addError(!form.gdprConsent, 'Bez souhlasu s informacemi o zpracování údajů nelze formulář odeslat.', bucket);
		}

		errors = bucket;
		return bucket.length === 0;
	}

	function nextStep() {
		if (validateCurrentStep() && step < steps.length - 1) {
			errors = [];
			step += 1;
		}
	}

	function previousStep() {
		if (step > 0) {
			errors = [];
			step -= 1;
		}
	}

	function buildRegistrantRow() {
		return {
			name: `${form.firstName.trim()} ${form.lastName.trim()}`,
			age: form.ageGroup === '17-' ? 'J' : 'S',
			country: countryCode || '---',
			nss: form.attendsNss ? `${form.nssCategory} / ${form.nssBoatName.trim()}` : '-',
			rg: form.attendsRg ? (form.rgSailNumber ? String(form.rgSailNumber) : 'ano') : '-',
			footy: form.attendsFooty ? (form.footySailNumber ? String(form.footySailNumber) : 'ano') : '-'
		};
	}

	async function submitForm() {
		if (!validateCurrentStep(4)) {
			step = 4;
			return;
		}

		submitting = true;
		errors = [];

		try {
			const formData = new FormData();
			formData.append('firstName', form.firstName);
			formData.append('lastName', form.lastName);
			formData.append('ageGroup', form.ageGroup);
			formData.append('email', form.email);
			formData.append('club', form.club);
			formData.append('license', form.license);
			formData.append('country', countryCode);
			formData.append('accommodation', form.accommodation ? 'true' : 'false');
			formData.append('accommodationPersons', String(form.accommodationPersons));

			formData.append('attendsNss', form.attendsNss ? 'true' : 'false');
			if (form.attendsNss) {
				formData.append('nssCategory', form.nssCategory);
				formData.append('nssBoatName', form.nssBoatName);
				formData.append('nssScale', String(form.nssScale));
				formData.append('nssDisplacement', String(form.nssDisplacement));
				formData.append('nssSailArea', String(form.nssSailArea));
				formData.append('nssWaterline', String(form.nssWaterline));
			}

			formData.append('attendsRg', form.attendsRg ? 'true' : 'false');
			if (form.attendsRg) {
				formData.append('rgSailNumber', form.rgSailNumber);
			}

			formData.append('attendsFooty', form.attendsFooty ? 'true' : 'false');
			if (form.attendsFooty) {
				formData.append('footySailNumber', form.footySailNumber);
			}

			formData.append('marketingConsent', form.marketingConsent ? 'true' : 'false');
			formData.append('gdprConsent', form.gdprConsent ? 'true' : 'false');

			const response = await fetch('https://dataspracovavac.tode.cz/test.php', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				registrants = [buildRegistrantRow(), ...registrants];
				submitted = true;
			} else {
				const text = await response.text();
				errors = [`Odesílání selhalo: ${response.status} ${response.statusText}`, text].filter(Boolean);
			}
		} catch (err) {
			console.error(err);
			// @ts-ignore
			errors = ['Došlo k chybě při odesílání: ' + err.message];
		} finally {
			submitting = false;
		}
	}

	function resetForm() {
		form = createInitialForm();
		step = 0;
		errors = [];
		submitted = false;
	}
</script>

<svelte:head>
	<title>Těrlická plachta 2026 | Registrace</title>
	<meta
		name="description"
		content="Registrační formulář závodu Těrlická plachta 2026 pro kategorie NSS, RG650 a Footy."
	/>
</svelte:head>

<div class="page-shell">
	<section class="hero">
		<div class="hero-copy">
			<p class="eyebrow">Těrlická plachta 2026</p>
			<h1>Registrační formulář závodníků</h1>
			<p class="lead">
				Vyplňte údaje závodníka, zvolte lodní kategorie a na konci vše zkontrolujte před odesláním.
			</p>
		</div>

		<div class:closed={registrationClosed} class="countdown-card">
			<p class="countdown-label">{countdownLabel}</p>
			<div class="countdown-grid" aria-live="polite">
				<div>
					<strong>{formatCounter(countdown.days)}</strong>
					<span>dny</span>
				</div>
				<div>
					<strong>{formatCounter(countdown.hours)}</strong>
					<span>hodiny</span>
				</div>
				<div>
					<strong>{formatCounter(countdown.minutes)}</strong>
					<span>minuty</span>
				</div>
				<div>
					<strong>{formatCounter(countdown.seconds)}</strong>
					<span>sekundy</span>
				</div>
			</div>
			<p class="countdown-note">
				Uzávěrka je nastavena na 22. 9. 2026, po jejím uplynutí se formulář automaticky zamkne.
			</p>
		</div>
	</section>

	{#if submitted}
		<section class="success-card">
			<h2>Registrace byla úspěšně odeslána</h2>
			<p>
				Záznam jsem přidal do přehledu níže. Frontend je připravený na napojení skutečného
				odeslání e-mailu i editace registrace přes odkaz.
			</p>
			<button class="secondary" type="button" onclick={resetForm}>Vyplnit další registraci</button>
		</section>
	{:else}
		<section class="form-card">
			<div class="stepper" aria-label="Postup formuláře">
				{#each steps as label, index}
					<button
						type="button"
						class:active={index === step}
						class:done={index < step}
						onclick={() => {
							if (index <= step) {
								errors = [];
								step = index;
							}
						}}
					>
						<span>{index + 1}</span>
						{label}
					</button>
				{/each}
			</div>

			{#if errors.length > 0}
				<div class="error-box">
					<h3>Formulář potřebuje doplnit</h3>
					<ul>
						{#each errors as error}
							<li>{error}</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if registrationClosed}
				<div class="lock-banner">
					Registrace je uzavřená. Vyplněné údaje lze stále zobrazit, ale odeslání už není možné.
				</div>
			{/if}

			<div class="panel" class:disabled-panel={registrationClosed}>
				{#if step === 0}
					<div class="section-heading">
						<h2>Údaje o závodníkovi</h2>
						<p>Základní identifikace závodníka a případné ubytování.</p>
					</div>

					<div class="form-grid">
						<label>
							<span>Jméno</span>
							<input
								bind:value={form.firstName}
								oninput={() => { form.firstName = form.firstName.replace(/\s+/g, ''); }}
								disabled={registrationClosed}
								type="text"
							/>
						</label>

						<label>
							<span>Příjmení</span>
							<input
								bind:value={form.lastName}
								oninput={() => { form.lastName = form.lastName.replace(/\s+/g, ''); }}
								disabled={registrationClosed}
								type="text"
							/>
						</label>

						<fieldset class="full-width">
							<legend>Věk v době konání závodu</legend>
							<div class="inline-options">
								<label class="radio-option">
									<input bind:group={form.ageGroup} disabled={registrationClosed} type="radio" value="17-" />
									<span>17-</span>
								</label>
								<label class="radio-option">
									<input bind:group={form.ageGroup} disabled={registrationClosed} type="radio" value="18+" />
									<span>18+</span>
								</label>
							</div>
						</fieldset>

						<label>
							<span>E-mail</span>
							<input bind:value={form.email} disabled={registrationClosed} type="email" />
						</label>

						<label>
							<span>Klub</span>
							<input bind:value={form.club} disabled={registrationClosed} type="text" />
						</label>

						<label>
							<span>Licence</span>
							<input bind:value={form.license} disabled={registrationClosed} type="text" />
						</label>

						<label>
							<span>ISO státu</span>
							<select bind:value={form.country} disabled={registrationClosed}>
								{#each isoOptions as option}
									<option value={option}>
										{option === 'OTHER' ? 'Jiný stát' : option}
									</option>
								{/each}
							</select>
						</label>

						{#if form.country === 'OTHER'}
							<label>
								<span>Vlastní ISO státu</span>
								<input
									bind:value={form.customCountry}
									disabled={registrationClosed}
									maxlength="3"
									placeholder="např. DEU"
									type="text"
								/>
							</label>
						{/if}

						<div class="full-width checkbox-card">
							<label class="toggle">
								<input bind:checked={form.accommodation} disabled={registrationClosed} type="checkbox" />
								<span>Chci ubytování</span>
							</label>

							{#if form.accommodation}
								<label class="compact-field">
									<span>Počet osob</span>
									<input
										bind:value={form.accommodationPersons}
										disabled={registrationClosed}
										min="1"
										step="1"
										type="number"
									/>
								</label>
							{/if}
						</div>
					</div>
				{/if}

				{#if step === 1}
					<div class="section-heading">
						<h2>Údaje o lodi NSS</h2>
						<p>Nejprve zvolte, zda závodník jede kategorii NSS. Po zapnutí se karta odemkne.</p>
					</div>

					<div class="category-card">
						<label class="toggle">
							<input bind:checked={form.attendsNss} disabled={registrationClosed} type="checkbox" />
							<span>Závodník jede kategorii NSS</span>
						</label>

						<div class:inactive={!form.attendsNss} class="subform-grid">
							<label>
								<span>Kategorie</span>
								<select bind:value={form.nssCategory} disabled={registrationClosed || !form.attendsNss}>
									{#each nssCategories as category}
										<option value={category}>{category}</option>
									{/each}
								</select>
							</label>

							<label>
								<span>Název lodi</span>
								<input bind:value={form.nssBoatName} disabled={registrationClosed || !form.attendsNss} type="text" />
							</label>

							<label>
								<span>Měřítko 1:x</span>
								<input
									bind:value={form.nssScale}
									disabled={registrationClosed || !form.attendsNss}
									max="50"
									min="1"
									step="0.1"
									type="number"
								/>
							</label>

							<label>
								<span>Výtlak (kg)</span>
								<input
									bind:value={form.nssDisplacement}
									disabled={registrationClosed || !form.attendsNss}
									max="100"
									min="0"
									step="0.001"
									type="number"
								/>
							</label>

							<label>
								<span>Plocha plachet (m2)</span>
								<input
									bind:value={form.nssSailArea}
									disabled={registrationClosed || !form.attendsNss}
									max="50"
									min="0"
									step="0.001"
									type="number"
								/>
							</label>

							<label>
								<span>Délka vodorysky (mm)</span>
								<input
									bind:value={form.nssWaterline}
									disabled={registrationClosed || !form.attendsNss}
									max="4000"
									min="0"
									step="0.001"
									type="number"
								/>
							</label>
						</div>
					</div>
				{/if}

				{#if step === 2}
					<div class="section-heading">
						<h2>Údaje o lodi RG650</h2>
						<p>Číslo na plachtě je nepovinné, ale pokud ho vyplníte, musí být v rozsahu 1 až 999.</p>
					</div>

					<div class="category-card">
						<label class="toggle">
							<input bind:checked={form.attendsRg} disabled={registrationClosed} type="checkbox" />
							<span>Závodník jede kategorii RG650</span>
						</label>

						<div class:inactive={!form.attendsRg} class="subform-grid">
							<label>
								<span>Číslo na plachtě</span>
								<input
									bind:value={form.rgSailNumber}
									disabled={registrationClosed || !form.attendsRg}
									max="999"
									min="1"
									step="1"
									type="number"
								/>
							</label>
						</div>
					</div>
				{/if}

				{#if step === 3}
					<div class="section-heading">
						<h2>Údaje o lodi Footy</h2>
						<p>Stejný princip jako u RG650: nejprve potvrzení účasti, potom volitelné číslo na plachtě.</p>
					</div>

					<div class="category-card">
						<label class="toggle">
							<input bind:checked={form.attendsFooty} disabled={registrationClosed} type="checkbox" />
							<span>Závodník jede kategorii Footy</span>
						</label>

						<div class:inactive={!form.attendsFooty} class="subform-grid">
							<label>
								<span>Číslo na plachtě</span>
								<input
									bind:value={form.footySailNumber}
									disabled={registrationClosed || !form.attendsFooty}
									max="999"
									min="1"
									step="1"
									type="number"
								/>
							</label>
						</div>
					</div>
				{/if}

				{#if step === 4}
					<div class="section-heading">
						<h2>Rekapitulace a potvrzení</h2>
						<p>Ještě jednou zkontrolujte údaje a potvrďte jejich správnost před odesláním.</p>
					</div>

					<div class="summary-grid">
						<div class="summary-card">
							<h3>Závodník</h3>
							<dl>
								<div><dt>Jméno</dt><dd>{form.firstName} {form.lastName}</dd></div>
								<div><dt>Věková kategorie</dt><dd>{form.ageGroup}</dd></div>
								<div><dt>E-mail</dt><dd>{form.email}</dd></div>
								<div><dt>Klub</dt><dd>{form.club.trim() || 'Neuvedeno'}</dd></div>
								<div><dt>Licence</dt><dd>{form.license.trim() || 'Neuvedeno'}</dd></div>
								<div><dt>ISO státu</dt><dd>{countryCode || '---'}</dd></div>
								<div><dt>Ubytování</dt><dd>{form.accommodation ? `${form.accommodationPersons} osob` : 'Ne'}</dd></div>
							</dl>
						</div>

						<div class="summary-card">
							<h3>Lodě</h3>
							<dl>
								<div><dt>NSS</dt><dd>{form.attendsNss ? `${form.nssCategory}, ${form.nssBoatName || 'bez názvu'}` : 'Nejede'}</dd></div>
								<div><dt>RG650</dt><dd>{form.attendsRg ? (form.rgSailNumber ? `Plachta ${form.rgSailNumber}` : 'Ano, bez čísla') : 'Nejede'}</dd></div>
								<div><dt>Footy</dt><dd>{form.attendsFooty ? (form.footySailNumber ? `Plachta ${form.footySailNumber}` : 'Ano, bez čísla') : 'Nejede'}</dd></div>
							</dl>
						</div>
					</div>

					<div class="consent-card">
						<label class="toggle">
							<input bind:checked={form.summaryConfirmed} disabled={registrationClosed} type="checkbox" />
							<span>Potvrzuji správnost zadaných údajů.</span>
						</label>

						<label class="toggle">
							<input bind:checked={form.marketingConsent} disabled={registrationClosed} type="checkbox" />
							<span>Chci dostávat informace o dalších ročnících závodu a novinkách e-mailem.</span>
						</label>

						<label class="toggle">
							<input bind:checked={form.gdprConsent} disabled={registrationClosed} type="checkbox" />
							<span>
								Potvrzuji, že jsem se seznámil s
								<a href={assets + '/informace-o-zpracovani-osobnich-udaju.html'} rel="noreferrer" target="_blank">
									Informacemi o zpracování osobních údajů
								</a>.
							</span>
						</label>
					</div>
				{/if}
			</div>

			<div class="actions">
				<button class="secondary" disabled={step === 0} type="button" onclick={previousStep}>
					Zpět
				</button>

				{#if step < steps.length - 1}
					<button class="primary" disabled={registrationClosed} type="button" onclick={nextStep}>
						Pokračovat
					</button>
				{:else}
					<button class="primary" disabled={registrationClosed || submitting} type="button" onclick={submitForm}>
						{submitting ? 'Odesílám...' : 'Odeslat registraci'}
					</button>
				{/if}
			</div>
		</section>
	{/if}

	<section class="table-card">
		<div class="section-heading">
			<h2>Soupiska registrovaných závodníků</h2>
			<p>
				Tahle tabulka zobrazuje aktuální registrace načtené z databáze. Nově odeslané registrace z aktuální relace se zobrazí po refresh stránky.
			</p>
		</div>

		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th>Jméno a příjmení</th>
						<th>Věk</th>
						<th>Stát</th>
						<th>NSS</th>
						<th>RG</th>
						<th>Footy</th>
					</tr>
				</thead>
				<tbody>
					{#each registrants as registrant}
						<tr>
							<td>{registrant.name}</td>
							<td>{registrant.age}</td>
							<td>{registrant.country}</td>
							<td>{registrant.nss}</td>
							<td>{registrant.rg}</td>
							<td>{registrant.footy}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="table-stats">
			<h3>Statistiky přihlášených</h3>
			<div class="stats-grid">
				<div class="stat-card">
					<strong>{stats.pocet_ucastniku}</strong>
					<span>Celkem závodníků</span>
				</div>
				<div class="stat-card">
					<strong>{stats.pocet_maket}</strong>
					<span>Makety NSS</span>
				</div>
				<div class="stat-card">
					<strong>{stats.pocet_rg}</strong>
					<span>RG650</span>
				</div>
				<div class="stat-card">
					<strong>{stats.pocet_footy}</strong>
					<span>Footy</span>
				</div>
			</div>
		</div>
	</section>
</div>

<style>

	.page-shell {
		max-width: 1180px;
		margin: 0 auto;
		padding: 32px 20px 64px;
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
		gap: 24px;
		align-items: stretch;
		margin-bottom: 28px;
	}

	.hero-copy,
	.countdown-card,
	.form-card,
	.table-card,
	.success-card {
		border: 1px solid rgba(69, 206, 206, 0.2);
		border-radius: 24px;
		box-shadow: 0 24px 70px rgba(0, 0, 0, 0.2);
	}

	.hero-copy {
		padding: 32px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
	}

	.eyebrow {
		margin: 0 0 10px;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.8rem;
		opacity: 0.75;
	}

	h1,
	h2,
	h3,
	p {
		margin-top: 0;
	}

	h1 {
		margin-bottom: 14px;
		font-size: clamp(2.3rem, 5vw, 4.2rem);
		line-height: 0.96;
		max-width: 11ch;
	}

	.lead {
		max-width: 55ch;
		color: rgba(255, 255, 255, 0.86);
		font-size: 1.05rem;
		line-height: 1.6;
	}

	.countdown-card {
		padding: 28px;
		background: rgba(255, 255, 255, 0.94);
		color: #303b4a;
	}

	.countdown-card.closed {
		background: rgba(255, 255, 255, 0.82);
	}

	.countdown-label {
		font-size: 0.95rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	.countdown-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
		margin: 18px 0;
	}

	.countdown-grid div {
		padding: 16px 10px;
		border-radius: 18px;
		text-align: center;
		background: rgba(48, 59, 74, 0.08);
	}

	.countdown-grid strong {
		display: block;
		font-size: 2rem;
		line-height: 1;
		margin-bottom: 8px;
	}

	.countdown-grid span {
		font-size: 0.88rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.countdown-note {
		margin-bottom: 0;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.form-card,
	.table-card,
	.success-card {
		padding: 28px;
		background: rgba(255, 255, 255, 0.96);
		color: #303b4a;
	}

	.form-card {
		margin-bottom: 28px;
	}

	.stepper {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 10px;
		margin-bottom: 22px;
	}

	.stepper button {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 14px;
		border: 1px solid rgba(48, 59, 74, 0.12);
		border-radius: 999px;
		background: #f2f7f7;
		color: #303b4a;
		font: inherit;
		cursor: pointer;
		transition: 180ms ease;
	}

	.stepper button span {
		display: inline-grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: rgba(48, 59, 74, 0.08);
		font-weight: 700;
	}

	.stepper button.active,
	.stepper button.done {
		background: #303b4a;
		color: #45cece;
	}

	.stepper button.active span,
	.stepper button.done span {
		background: rgba(69, 206, 206, 0.12);
	}

	.error-box,
	.lock-banner {
		margin-bottom: 20px;
		padding: 16px 18px;
		border-radius: 18px;
	}

	.error-box {
		background: #fff3f3;
		border: 1px solid #ffc4c4;
		color: #7f1d1d;
	}

	.error-box ul {
		margin: 10px 0 0;
		padding-left: 18px;
	}

	.lock-banner {
		background: rgba(48, 59, 74, 0.08);
		border: 1px dashed rgba(48, 59, 74, 0.22);
	}

	.panel {
		padding: 24px;
		border-radius: 22px;
		background: linear-gradient(180deg, #ffffff 0%, #f8fbfb 100%);
	}

	.disabled-panel {
		opacity: 0.7;
	}

	.section-heading {
		margin-bottom: 20px;
	}

	.section-heading p {
		margin-bottom: 0;
		color: rgba(48, 59, 74, 0.72);
		line-height: 1.6;
	}

	.form-grid,
	.subform-grid,
	.summary-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}

	label,
	fieldset {
		display: grid;
		gap: 8px;
	}

	label span,
	legend {
		font-weight: 700;
	}

	fieldset {
		padding: 0;
		border: 0;
		margin: 0;
	}

	.full-width {
		grid-column: 1 / -1;
	}

	input,
	select {
		width: 100%;
		box-sizing: border-box;
		padding: 14px 16px;
		border: 1px solid rgba(48, 59, 74, 0.16);
		border-radius: 16px;
		background: white;
		color: #303b4a;
		font: inherit;
	}

	input:focus,
	select:focus {
		outline: 2px solid rgba(69, 206, 206, 0.35);
		border-color: #45cece;
	}

	.inline-options {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.radio-option,
	.toggle {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 16px;
		border: 1px solid rgba(48, 59, 74, 0.12);
		border-radius: 16px;
		background: white;
	}

	.radio-option input,
	.toggle input {
		width: auto;
		margin: 0;
	}

	.checkbox-card,
	.category-card,
	.consent-card {
		padding: 18px;
		border-radius: 20px;
		background: rgba(48, 59, 74, 0.04);
	}

	.checkbox-card,
	.consent-card {
		display: grid;
		gap: 14px;
	}

	.compact-field {
		max-width: 180px;
	}

	.subform-grid {
		margin-top: 16px;
		position: relative;
	}

	.inactive {
		opacity: 0.42;
		filter: grayscale(0.18);
	}

	.summary-card {
		padding: 18px;
		border-radius: 18px;
		background: rgba(48, 59, 74, 0.04);
	}

	dl {
		display: grid;
		gap: 12px;
		margin: 0;
	}

	dl div {
		display: grid;
		grid-template-columns: minmax(110px, 140px) 1fr;
		gap: 10px;
	}

	dt {
		font-weight: 700;
	}

	dd {
		margin: 0;
		color: rgba(48, 59, 74, 0.86);
	}

	.actions {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		margin-top: 22px;
	}

	button.primary,
	button.secondary {
		padding: 14px 22px;
		border-radius: 999px;
		font: inherit;
		font-weight: 700;
		cursor: pointer;
		transition: 180ms ease;
	}

	button.primary {
		border: 1px solid #303b4a;
		background: #303b4a;
		color: #45cece;
	}

	button.secondary {
		border: 1px solid rgba(48, 59, 74, 0.16);
		background: white;
		color: #303b4a;
	}

	button:hover:not(:disabled) {
		transform: translateY(-1px);
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
		transform: none;
	}

	.success-card {
		margin-bottom: 28px;
	}

	.table-wrap {
		overflow-x: auto;
	}

	.table-stats {
		margin-top: 24px;
		padding-top: 20px;
		border-top: 1px solid rgba(48, 59, 74, 0.12);
	}

	.table-stats h3 {
		font-size: 1.1rem;
		margin-bottom: 14px;
		color: #303b4a;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}

	.stat-card {
		padding: 16px 14px;
		border-radius: 18px;
		background: rgba(48, 59, 74, 0.05);
		border: 1px solid rgba(48, 59, 74, 0.08);
		text-align: center;
	}

	.stat-card strong {
		display: block;
		font-size: 1.8rem;
		line-height: 1.1;
		color: #303b4a;
		margin-bottom: 4px;
	}

	.stat-card span {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: rgba(48, 59, 74, 0.75);
		font-weight: 600;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 720px;
	}

	th,
	td {
		padding: 14px 16px;
		border-bottom: 1px solid rgba(48, 59, 74, 0.1);
		text-align: left;
	}

	th {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	@media (max-width: 900px) {
		.hero,
		.form-grid,
		.subform-grid,
		.summary-grid {
			grid-template-columns: 1fr;
		}

		.stepper {
			grid-template-columns: 1fr;
		}

		.countdown-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.page-shell {
			padding-inline: 14px;
		}

		.hero-copy,
		.countdown-card,
		.form-card,
		.table-card,
		.success-card {
			padding: 20px;
			border-radius: 20px;
		}

		.panel {
			padding: 18px;
		}

		.actions {
			flex-direction: column-reverse;
		}

		button.primary,
		button.secondary {
			width: 100%;
		}

		dl div {
			grid-template-columns: 1fr;
			gap: 4px;
		}
	}
</style>
