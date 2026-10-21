<script>
	import { onMount } from 'svelte';
	import emailjs from '@emailjs/browser';

	/** @type {string} */
	let name = $state('');
	/** @type {string} */
	let tema = $state('Vyberte');
	/** @type {string} */
	let email = $state('');
	/** @type {string} */
	let message = $state('');
	/** @type {string} */
	let status = $state('');
	/** @type {boolean} */
	let loading = $state(false);

	const themes = [
		{ value: 'Vyberte', label: 'Vyberte' },
		{ value: 'Dotaz', label: 'Dotaz' },
		{ value: 'Hlasenichyby', label: 'Hlášení chyby' },
		{ value: 'Historie', label: 'Záznam do historie' }
	];

	onMount(() => {
		emailjs.init("user_aHSZslb08hBUmqeZ4wJ6L");
	});

	async function handleSubmit() {
		if (!name.trim()) {
			status = 'Jméno nezadáno';
			return;
		}
		if (!email.trim()) {
			status = 'Email nezadán';
			return;
		}
		if (!message.trim()) {
			status = 'Zpráva nezadána';
			return;
		}

		loading = true;
		status = 'Odesílám...';

		const templateParams = {
			jmeno: name,
			email: email,
			typ_zpravy: tema,
			zprava: message
		};

		try {
			const response = await emailjs.send('service_w22m9er', 'template_jwxganp', templateParams);
			console.log('SUCCESS!', response.status, response.text);
			status = 'Zpráva odeslána!';
			name = '';
			tema = 'Vyberte';
			email = '';
			message = '';
		} catch (error) {
			console.log('FAILED...', error);
			status = 'Něco se pokazilo, zkuste odeslání znovu.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Těrlická plachta 2027 | Kontakt</title>
</svelte:head>

<div class="page-shell">
	<section class="hero">
		<div class="hero-copy">
			<p class="eyebrow">Kontakt</p>
			<h1>Napište nám!</h1>
			<p class="lead">
				Máte dotaz, chcete nahlásit chybu nebo nám poslat záznam do historie? Použijte formulář níže.
			</p>
		</div>
	</section>

	<section class="form-card">
		<div class="panel">
			<div class="form-grid">
				<label>
					<span>Jméno *</span>
					<input bind:value={name} type="text" placeholder="Vaše jméno" />
				</label>

				<label>
					<span>Téma</span>
					<select bind:value={tema}>
						{#each themes as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</label>

				<label class="full-width">
					<span>Email *</span>
					<input bind:value={email} type="email" placeholder="vas@email.cz" />
				</label>

				<label class="full-width">
					<span>Zpráva *</span>
					<textarea bind:value={message} rows="7" placeholder="Vaše zpráva..."></textarea>
				</label>
			</div>

			{#if status}
				<div class="status-message" class:success={status === 'Zpráva odeslána!'} class:error={status.includes('pokazilo') || status.includes('nezadáno')}>
					{status}
				</div>
			{/if}

			<div class="actions">
				<button class="primary" type="button" onclick={handleSubmit} disabled={loading}>
					{loading ? 'Odesílám...' : 'Odeslat'}
				</button>
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
		margin-bottom: 28px;
	}

	.hero-copy,
	.form-card {
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

	h1 {
		margin-bottom: 14px;
		font-size: clamp(2.3rem, 5vw, 4.2rem);
		line-height: 0.96;
	}

	.lead {
		max-width: 55ch;
		color: rgba(255, 255, 255, 0.86);
		font-size: 1.05rem;
		line-height: 1.6;
	}

	.form-card {
		padding: 28px;
		background: rgba(255, 255, 255, 0.96);
		color: #303b4a;
	}

	.panel {
		padding: 24px;
		border-radius: 22px;
		background: linear-gradient(180deg, #ffffff 0%, #f8fbfb 100%);
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}

	label {
		display: grid;
		gap: 8px;
	}

	label span {
		font-weight: 700;
	}

	.full-width {
		grid-column: 1 / -1;
	}

	input,
	select,
	textarea {
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
	select:focus,
	textarea:focus {
		outline: 2px solid rgba(69, 206, 206, 0.35);
		border-color: #45cece;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 22px;
	}

	button.primary {
		padding: 14px 44px;
		border-radius: 999px;
		font: inherit;
		font-weight: 700;
		cursor: pointer;
		transition: 180ms ease;
		border: 1px solid #303b4a;
		background: #303b4a;
		color: #45cece;
	}

	button:hover:not(:disabled) {
		transform: translateY(-1px);
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.status-message {
		margin-top: 20px;
		padding: 12px 16px;
		border-radius: 12px;
		font-weight: 700;
		text-align: center;
	}

	.status-message.success {
		background: #dcfce7;
		color: #166534;
	}

	.status-message.error {
		background: #fee2e2;
		color: #991b1b;
	}

	@media (max-width: 800px) {
		.form-grid {
			grid-template-columns: 1fr;
		}

		button.primary {
			width: 100%;
		}
	}
</style>
