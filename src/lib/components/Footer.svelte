<script>
	import { base } from '$app/paths';
</script>

<footer id="footer">
	<div class="bottom_lines">
		<div class="bottom_line_nad">Co? Kdy? Kde?</div>
		<div class="bottom_line">
			<svg class="footer-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
			<span>Setkání plachetnic třídy NSS - A,B,C,RG-650</span>
		</div>
		<div class="bottom_line">
			<svg class="footer-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
			<span>25.-27.9.2026</span>
		</div>
		<div class="bottom_line">
			<svg class="footer-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
			<span>RS Vyhlídka Těrlicko</span>
		</div>
	</div>
	<div class="bottom_lines">
		<div class="bottom_line_nad">Registrace</div>
		<div class="bottom_line">
			<svg class="footer-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
			<a href={base + '/propozice/2025/propozice.pdf'}>Propozice</a>
		</div>
		<div class="bottom_line">
			<svg class="footer-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
			<a href={base + '/registrace'}>Registrační formulář</a>
		</div>
	</div>
	<div class="bottom_lines">
		<div class="bottom_line_nad">Kontakt</div>
		<div class="bottom_line">
			<svg class="footer-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
			<a href="mailto:sebastian.walent@gmail.com">sebastian.walent@gmail.com</a>
		</div>
		<div class="bottom_line">
			<svg class="footer-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
			<a href="mailto:modelari.slezsko@gmail.com">modelari.slezsko@gmail.com</a>
		</div>
	</div>
</footer>

<style>
	#footer {
		background-color: #363131;
		display: flex;
		justify-content: space-around;
		text-align: left;
		padding: 40px 15%;
		margin-top: 60px;
	}
	.bottom_lines {
		display: flex;
		flex-direction: column;
	}
	.bottom_line_nad {
		color: white;
		margin-bottom: 12px;
		font-weight: bold;
		font-size: 1.1rem;
	}
	.bottom_line {
		font-size: 0.9rem;
		color: #b4a3a3;
		margin-bottom: 8px;
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.footer-icon {
		stroke: #ffffff;
		flex-shrink: 0;
		width: 18px;
		height: 18px;
	}
	.bottom_line a {
		color: #b4a3a3;
		text-decoration: none;
		transition: color 0.2s;
	}
	.bottom_line a:hover {
		color: white;
	}
	@media (max-width: 768px) {
		#footer {
			flex-direction: column;
			padding: 30px 10%;
			gap: 30px;
		}
	}
</style>
