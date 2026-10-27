<script>
	import { base } from '$app/paths';
	const { data } = $props();
	const year = data.year;
</script>

<svelte:head>
	<title>Výsledky {year} - Těrlická plachta</title>
</svelte:head>

<div class="container">
	<h1>Výsledky {year}</h1>

	<div class="results-content">
		<section>
			<h2>NSS</h2>
			<div class="pdf-wrapper">
				<object
					data={base + `/vysledky/${year}/${year}.pdf`}
					type="application/pdf"
					width="100%"
					height="600px"
					title="Výsledky NSS {year}"
				>
					<p>Váš prohlížeč nepodporuje prohlížení PDF. <a href={base + `/vysledky/${year}/${year}.pdf`}>Stáhnout PDF</a>.</p>
				</object>
			</div>
		</section>

		<section>
			<h2>RG650</h2>
			<div class="pdf-wrapper">
				<object
					data={base + `/vysledky/${year}/${year}rg.pdf`}
					type="application/pdf"
					width="100%"
					height="600px"
					title="Výsledky RG650 {year}"
				>
					<p>Váš prohlížeč nepodporuje prohlížení PDF. <a href={base + `/vysledky/${year}/${year}rg.pdf`}>Stáhnout PDF</a>.</p>
				</object>
			</div>
		</section>

		<section>
			<h2>Buchta a Regata</h2>
			<div class="pdf-wrapper">
				<object
					data={base + `/vysledky/${year}/${year}buchreg.pdf`}
					type="application/pdf"
					width="100%"
					height="600px"
					title="Výsledky Buchta a Regata {year}"
				>
					<p>Váš prohlížeč nepodporuje prohlížení PDF. <a href={base + `/vysledky/${year}/${year}buchreg.pdf`}>Stáhnout PDF</a>.</p>
				</object>
			</div>
		</section>

		{#if year === '2026'}
			<section>
				<h2>GPS tracking – naměřené trasy bojek</h2>
				<div class="gps-wrapper">
					<iframe
						src="http://slezsko-apps.myftp.org:50503/cases/T%C4%9Brlick%C3%A1%20plachta%202026"
						width="100%"
						height="600px"
						style="border:0;"
						allowfullscreen=""
						loading="lazy"
						title="GPS trasy bojek Těrlická plachta 2026">
					</iframe>
				</div>
				<div class="gps-link">
					<a href="http://slezsko-apps.myftp.org:50503/cases/T%C4%9Brlick%C3%A1%20plachta%202026" class="download-btn" target="_blank" rel="noopener noreferrer">Otevřít GPS tracking na celou obrazovku</a>
				</div>
			</section>
		{/if}

		<div class="download-section">
			<h3>Stažení kompletních výsledků</h3>
			<div class="button-group">
				<a href={base + `/vysledky/${year}/${year}comp.pdf`} class="download-btn" download>PDF</a>
        {#if year === '2023'}
            <a href={base + `/vysledky/${year}/${year}.xlsx`} class="download-btn" download>XLSX</a>
        {/if}
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1180px;
		margin: 0 auto;
		padding: 0 20px 60px;
		text-align: center;
	}

	h1 {
		font-size: 4rem;
		margin-bottom: 30px;
		color: #45cece;
	}

	h2 {
		font-size: 2rem;
		margin: 40px 0 20px;
		color: #45cece;
	}

	h3 {
		font-size: 1.5rem;
		margin-bottom: 20px;
		color: #45cece;
	}

	.results-content {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.pdf-wrapper {
		background: rgba(255, 255, 255, 0.96);
		border: 1px solid rgba(69, 206, 206, 0.2);
		border-radius: 24px;
		overflow: hidden;
		box-shadow: 0 24px 70px rgba(0, 0, 0, 0.2);
	}

	.gps-wrapper {
		background: rgba(255, 255, 255, 0.96);
		border: 1px solid rgba(69, 206, 206, 0.2);
		border-radius: 24px;
		overflow: hidden;
		box-shadow: 0 24px 70px rgba(0, 0, 0, 0.2);
	}

	.gps-link {
		margin-top: 16px;
		text-align: center;
	}

	.download-section {
		margin-top: 40px;
		padding: 30px;
		background: rgba(255, 255, 255, 0.96);
		border-radius: 24px;
		box-shadow: 0 24px 70px rgba(0, 0, 0, 0.2);
		color: #303b4a;
	}

	.button-group {
		display: flex;
		justify-content: center;
		gap: 20px;
	}

	.download-btn {
		background-color: #303b4a;
		color: white;
		padding: 12px 30px;
		border-radius: 8px;
		text-decoration: none;
		font-weight: bold;
		transition: all 0.2s;
		min-width: 120px;
	}

	.download-btn:hover {
		background-color: #45cece;
		transform: translateY(-2px);
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 2.5rem;
		}
		h2 {
			font-size: 1.5rem;
		}
		.pdf-wrapper object {
			height: 400px;
		}
	}
</style>
