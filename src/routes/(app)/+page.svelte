<script>
	import { assets } from '$app/paths';

	/** @type {string} */
	let modalImg = $state('');

	/** @param {string} src */
	function openModal(src) {
		modalImg = src;
	}

	function closeModal() {
		modalImg = '';
	}
</script>

<svelte:head>
	<title>Těrlická plachta 2026</title>
</svelte:head>

<div class="page-shell">
	<section class="hero">
		<div class="hero-copy">
			<h1>Těrlická plachta 2026</h1>
			<p class="lead">Kdy: 25.–27. 9. 2026 • RS Vyhlídka Těrlicko</p>
			<p class="lead">Kde: RS Vyhlídka Těrlicko</p>
			<p class="lead">
				Co: Setkání plachetnic třídy NSS - A, B, C, RG-650 a další typy plachetnic bez strojního pohonu
			</p>
		</div>
	</section>

	<div class="propozice-section info-card">
		<h3 class="eyebrow-header">PROPOZICE</h3>
		<p class="status">Poslední změna : 3.7.2026</p>
		<a
			href={assets + '/propozice/propozice.pdf'}
			download
			class="download-btn"
		>
			Stažení propozic (PDF)
		</a>
		<div id="propozice">
			<button type="button" class="propozice-btn" onclick={() => openModal(assets + '/propozice/propozice1.png')}>
				<img src={assets + '/propozice/propozice1.png'} alt="Propozice 1" class="myImg" />
			</button>
			<button type="button" class="propozice-btn" onclick={() => openModal(assets + '/propozice/propozice2.png')}>
				<img src={assets + '/propozice/propozice2.png'} alt="Propozice 2" class="myImg" />
			</button>
		</div>
	</div>

	<div class="map-section info-card">
		<h3 class="eyebrow-header">Kde nás najdete</h3>
		<p class="map-desc">RS Vyhlídka Těrlicko (Lipová 815/9, Horní Těrlicko)</p>

		<div class="map-container">
			<iframe
				src="https://www.openstreetmap.org/export/embed.html?bbox=18.48493576049805%2C49.757134375549045%2C18.498218059539798%2C49.763264627195726&amp;layer=mapnik&amp;marker=49.7602009%2C18.4915791"
				width="100%"
				height="100%"
				style="border: 0;"
				title="Mapa místa konání na OpenStreetMap"
				allowfullscreen
				loading="lazy"
			></iframe>
		</div>

		<div class="map-buttons">
			<a
				href="https://www.google.com/maps/place/Rekrea%C4%8Dn%C3%AD+St%C5%99edisko+Na+Vyhl%C3%ADdce/@49.7602009,18.4915791,17z/data=!3m1!4b1!4m6!3m5!1s0x4713f8a4faf18b1d:0x173c33626a5fee4d!8m2!3d49.7602009!4d18.4915791!16s%2Fg%2F1xb2c926"
				target="_blank"
				rel="noopener noreferrer"
				class="provider-btn google-maps"
			>
				Google Mapy
			</a>
			<a
				href="https://mapy.cz/zakladni?source=firm&id=475597"
				target="_blank"
				rel="noopener noreferrer"
				class="provider-btn mapy-cz"
			>
				Mapy.cz
			</a>
			<a
				href="https://www.openstreetmap.org/?mlat=49.75981&mlon=18.49204#map=17/49.75981/18.49204"
				target="_blank"
				rel="noopener noreferrer"
				class="provider-btn openstreetmap"
			>
				OpenStreetMap
			</a>
		</div>
	</div>
</div>

{#if modalImg}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal" onclick={closeModal}>
		<span class="close" aria-label="Zavřít">&times;</span>
		<img class="modal-content" src={modalImg} alt="Zvětšený obrázek" onclick={(e) => e.stopPropagation()} />
	</div>
{/if}

<style>
	.page-shell {
		max-width: 1180px;
		margin: 0 auto;
		padding: 32px 20px 64px;
	}

	.hero {
		margin-bottom: 28px;
	}

	.hero-copy {
		border: 1px solid rgba(69, 206, 206, 0.2);
		border-radius: 24px;
		box-shadow: 0 24px 70px rgba(0, 0, 0, 0.2);
		padding: 32px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
		transition:
			transform 0.3s ease,
			border-color 0.3s ease;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.hero-copy:hover {
		transform: translateY(-5px);
		border-color: rgba(69, 206, 206, 0.4);
	}

	h1 {
		margin-bottom: 14px;
		font-size: clamp(2.3rem, 5vw, 4.2rem);
		line-height: 0.96;
		color: #45cece;
	}

	p {
		font-size: 1.2rem;
		color: #dadfe4;
	}

	.info-card p {
		color: #303b4a;
	}

	.propozice-section {
		margin-bottom: 60px;
	}

	.info-card {
		border: 1px solid rgba(69, 206, 206, 0.2);
		border-radius: 24px;
		background: rgba(255, 255, 255, 0.96);
		color: #303b4a;
		padding: 32px;
		box-shadow: 0 24px 70px rgba(0, 0, 0, 0.2);
		transition:
			transform 0.3s ease,
			border-color 0.3s ease;
		height: 100%;
		box-sizing: border-box;
		text-align: center;
	}

	.info-card:hover {
		transform: translateY(-5px);
		border-color: rgba(69, 206, 206, 0.4);
	}

	.lead {
		margin: 0 0 10px;
		color: rgba(255, 255, 255, 0.86);
		font-size: 1.15rem;
		line-height: 1.5;
		font-weight: 400;
	}

	.eyebrow-header {
		display: inline-block;
		margin: 0 0 16px;
		padding: 4px 12px;
		background: rgba(69, 206, 206, 0.1);
		border: 1px solid rgba(69, 206, 206, 0.2);
		border-radius: 999px;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.7rem;
		font-weight: 600;
		color: #008080;
	}

	.status {
		margin-bottom: 30px;
		font-style: italic;
		opacity: 1;
		color: #303b4a;
	}

	.download-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 24px;
		padding: 12px 20px;
		border-radius: 999px;
		background: #45cece;
		color: #0f172a;
		font-weight: 700;
		text-decoration: none;
		box-shadow: 0 8px 20px rgba(69, 206, 206, 0.22);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.download-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 24px rgba(69, 206, 206, 0.28);
	}

	#propozice {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.propozice-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: block;
		width: 100%;
	}

	.myImg {
		width: 100%;
		border-radius: 8px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		transition: transform 0.3s ease;
	}

	.myImg:hover {
		transform: scale(1.02);
	}

	.modal {
		position: fixed;
		z-index: 1000;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	.modal-content {
		max-width: 100%;
		max-height: 100%;
		border-radius: 8px;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
	}

	.close {
		position: absolute;
		top: 18px;
		right: 24px;
		color: #fff;
		font-size: 40px;
		font-weight: bold;
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.close:hover {
		color: #45cece;
	}

	.map-section {
		margin-bottom: 60px;
	}

	.map-desc {
		margin-bottom: 20px;
		font-weight: 500;
	}

	.map-container {
		margin: 0 auto 24px;
		max-width: 800px;
		height: 450px;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(48, 59, 74, 0.1);
	}

	.map-buttons {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
		max-width: 800px;
		margin: 0 auto;
	}

	.provider-btn {
		box-sizing: border-box;
		flex: 1;
		min-width: 160px;
		max-width: 240px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 12px 20px;
		border-radius: 999px;
		font-weight: 700;
		text-decoration: none;
		transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	.provider-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
	}

	.provider-btn.google-maps {
		background: #303b4a;
		color: #45cece;
		border: 1px solid #303b4a;
	}

	.provider-btn.google-maps:hover {
		background: #1e293b;
	}

	.provider-btn.mapy-cz {
		background: #f43f5e;
		color: #ffffff;
		border: 1px solid #f43f5e;
	}

	.provider-btn.mapy-cz:hover {
		background: #e11d48;
	}

	.provider-btn.openstreetmap {
		background: #10b981;
		color: #ffffff;
		border: 1px solid #10b981;
	}

	.provider-btn.openstreetmap:hover {
		background: #059669;
	}

	@media (max-width: 800px) {
		.info-card {
			padding: 24px 16px;
		}

		#propozice {
			grid-template-columns: 1fr;
		}

		.map-container {
			height: 350px;
		}

		.map-buttons {
			flex-direction: column;
			align-items: center;
			width: 100%;
			box-sizing: border-box;
		}

		.provider-btn {
			width: 100%;
			max-width: 100%;
		}
	}
</style>
