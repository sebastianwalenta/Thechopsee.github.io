/**
 * @typedef {Object} HistoryEntry
 * @property {number} year
 * @property {Object} results
 * @property {string} results.type
 * @property {string} [results.url]
 * @property {Array<{label: string, url: string}>} articles
 * @property {Array<{label: string, url: string}>} gallery
 * @property {Record<number, string>} [imgExtensions]
 */

/** @type {HistoryEntry[]} */
export const historyData = [
	{
		year: 2025,
		results: { type: 'new', url: '/vysledky/2025/' },
		articles: [
			{ label: 'Minisail.cz', url: 'https://www.minisail.cz/setkani/z-akci/id:20506/terlicko-2025' }
		],
		gallery: [
			{
				label: 'Drive-Val',
				url: 'https://drive.google.com/drive/folders/1klacGCjAQwaq7JacOwutu30z0ZV3lZxG?usp=sharing'
			},
			{ label: 'Rajče-ferodedek', url: 'https://www.rajce.idnes.cz/album/3UDJRRvi7ibZymXC?' },
			{ label: 'Zonerama-Jiří Muclinger', url: 'https://eu.zonerama.com/6twua/Album/13927684' }
		]
	},
	{
		year: 2024,
		results: { type: 'new', url: '/vysledky/2024/' },
		articles: [
			{
				label: 'Minisail.cz',
				url: 'https://www.minisail.cz/setkani/z-akci/id:18787/terlicka-plachta-2024'
			},
			{
				label: 'Polar',
				url: 'https://polar.cz/index.php/zpravy/moravskoslezsky-kraj/cely-ms-kraj/11000045241/lodni-modelari-soutezili-na-prehrade-v-zavode-terlicka-plachta'
			}
		],
		gallery: [
			{ label: 'Youtube-Jiří Muclinger', url: 'https://youtu.be/CM5oRtg5olM?feature=shared' },
			{
				label: 'Video-Polar',
				url: 'https://polar.cz/index.php/zpravy/moravskoslezsky-kraj/cely-ms-kraj/11000045241/lodni-modelari-soutezili-na-prehrade-v-zavode-terlicka-plachta'
			},
			{ label: 'Rajce-ferodedek', url: 'https://www.rajce.idnes.cz/album/JiJysRZxaYkpVTrx?' },
			{
				label: 'Video-Petr Staněk',
				url: 'https://www.facebook.com/61558716742289/videos/1052083829681200/'
			},
			{
				label: 'Drive-Val',
				url: 'https://drive.google.com/drive/folders/1Og-qtfF3meH31QkNbqLy815w8R8B1yld?usp=sharing'
			}
		]
	},
	{
		year: 2023,
		results: { type: 'new', url: '/vysledky/2023/' },
		articles: [
			{
				label: 'Minisail.cz',
				url: 'https://www.minisail.cz/setkani/z-akci/id:17319/terlicka-plachta-2023'
			}
		],
		gallery: [
			{
				label: 'Drive-Val',
				url: 'https://drive.google.com/drive/folders/1wGup31O7Z-RAbWfALy5O8KVlaVV7sUGE?usp=drive_link'
			},
			{ label: 'Video-seb', url: 'https://youtu.be/zMv-NKWecbU?feature=shared' }
		]
	},
	{
		year: 2022,
		results: { type: 'link', url: '/vysledky/2022/' },
		articles: [
			{
				label: 'Minisail.cz',
				url: 'https://www.minisail.cz/setkani/z-akci/id:15629/terlicka-plachta-2022'
			},
			{ label: 'Oficiální report', url: '/clanky/Rep2022.pdf' }
		],
		gallery: [
			{
				label: 'Rajce-Ferodedek',
				url: 'https://minisail.rajce.idnes.cz/12._Terlicka_plachta_30._09._-_02._10._22/?'
			},
			{
				label: 'Drive-Val',
				url: 'https://drive.google.com/drive/folders/1VSYOAUbJJYjVkutYKk-_xaeN9fKaUsuQ?usp=sharing'
			},
			{
				label: 'Drive-JiříJakubec',
				url: 'https://drive.google.com/drive/folders/1ADp1lblpfIwnLGYfA-xfqVesONJfR5cg?usp=share_link'
			}
		]
	},
	{
		year: 2021,
		results: { type: 'download', url: '/vysledky/vysledky-2021.xlsx' },
		imgExtensions: { 2: 'png' },
		articles: [
			{
				label: 'Polar',
				url: 'https://polar.cz/zpravy/karvinsko/terlicko/11000027836/na-terlicke-plachte-zasahovali-potapeci?fbclid=IwAR2vnLrZcUTEOr5Ky3UY4bTVhog1Ef7xCsAeJpKNKf3HQvPQex_TubySk8U'
			},
			{ label: 'Minisail.cz', url: 'https://www.minisail.cz/setkani/z-akci/id:13859' },
			{ label: 'Oficiální report', url: '/clanky/tp2021.pdf' },
			{ label: 'Těrlický miniexpress', url: 'https://www.youtube.com/watch?v=llcK838mBz0' }
		],
		gallery: [
			{
				label: 'Minisail.pl',
				url: 'http://www.minisail.pl/index.php/2021/10/06/terlicko-2021/?fbclid=IwAR34HRgYVQOMhwWfLUEv8cdUjZQgTdGfFcr2uejdDD8dvlsD7uwIIFKEILU'
			},
			{
				label: 'Rajce-Ferodedek',
				url: 'https://minisail.rajce.idnes.cz/Terlicka_plachta_1._-_3._10._2021/'
			},
			{
				label: 'Drive-Val',
				url: 'https://drive.google.com/drive/folders/1JG2F9iNUn6NOawPQnZOkL0AGFgLFxVpd?usp=sharing'
			},
			{
				label: 'Fotky Google-Snek',
				url: 'https://photos.google.com/share/AF1QipNnHDr13oX2xww9A2vgowscje3L-Q2GszbPmqOWp4COteTuuM1zFRxtRB-rCBN-Cw?key=VE9GN1dhQmd6VjdxTHoyd19wRWdxVE1MMHY1TE93'
			},
			{ label: 'Rajce-Kubik-team', url: 'https://kubik-team.rajce.idnes.cz/Terlicka_plachta_2021/' }
		]
	},
	{
		year: 2020,
		results: { type: 'download', url: '/vysledky/2020/2020comp.txt' },
		articles: [
			{
				label: 'minisail.cz',
				url: 'https://www.minisail.cz/setkani/z-akci/id:12507/x-terlicka-plachta-2020'
			}
		],
		gallery: [
			{
				label: 'Drive-Val',
				url: 'https://drive.google.com/drive/folders/1zKT3x748ADWmIbU-sOcDF5jGU6uX26-1?usp=sharing'
			},
			{ label: 'Rajce-Kubik-team', url: 'https://kubik-team.rajce.idnes.cz/Terlicka_plachta_2020/' },
			{ label: 'Rajce-daja-se', url: 'https://daja-se.rajce.idnes.cz/Terlicka_plachta_2020/' },
			{
				label: 'Rajce-Ferodedek',
				url: 'https://minisail.rajce.idnes.cz/Jubilejni_X._Terlicka_plachta_25._-27._09._2020/'
			}
		]
	},
	{
		year: 2019,
		results: { type: 'download' },
		articles: [
			{
				label: 'minisail.cz',
				url: 'https://www.minisail.cz/setkani/z-akci/id:11371/zamykani-terlicko-2019'
			}
		],
		gallery: [
			{
				label: 'Drive-Seb',
				url: 'https://drive.google.com/drive/folders/1Wn3iQHFyGFzaUUOAenkkFOkBhoHOTVun?usp=sharing'
			},
			{ label: 'Rajce-Ferodedek', url: 'https://minisail.rajce.idnes.cz/Terlicko_2019/' }
		]
	},
	{
		year: 2018,
		results: { type: 'download' },
		articles: [
			{
				label: 'minisail.cz',
				url: 'https://www.minisail.cz/setkani/z-akci/id:10492/terlicka-plachta-2018'
			}
		],
		gallery: [
			{ label: 'Rajce-Kubik-team', url: 'https://kubik-team.rajce.idnes.cz/Terlicka_plachta_2018/' },
			{
				label: 'Rajce-Ferodedek',
				url: 'https://minisail.rajce.idnes.cz/Terlicka_plachta_-_Terlicko_2018/?'
			},
			{ label: 'Rajce-MoNaKo', url: 'https://monako.rajce.idnes.cz/terlicko_nss_180928/' }
		]
	},
	{
		year: 2017,
		results: { type: 'download', url: '/vysledky/2017/2017comp.pdf' },
		articles: [
			{
				label: 'modelyznojmo.webnode.cz',
				url: 'https://modelyznojmo.webnode.cz/kde-jsme-byli/terlicka-plachta-30-9-2017/'
			},
			{ label: 'minisail.cz', url: 'https://www.minisail.cz/setkani/z-akci/id:9036/terlicko-2017' }
		],
		gallery: [
			{
				label: 'Rajce-modelyzn',
				url: 'https://modelyzn.rajce.idnes.cz/Modely_Znojmo_Terlicka_plachta_30.9.2017/'
			},
			{ label: 'Youtube-Pavel Trvaj', url: 'https://www.youtube.com/watch?v=VjzVdAk6-Sw' },
			{ label: 'RCportal.sk-guitar61', url: 'https://www.rcportal.sk/terlicka-plachta-2017-g4826' },
			{ label: 'Youtube-Martin Machalík', url: 'https://www.youtube.com/watch?v=f2V4tbh1YcI' },
			{ label: 'Rajce-Ferodedek', url: 'https://minisail.rajce.idnes.cz/Terlicko_2017/' },
			{ label: 'Rajce-MoNaKo', url: 'https://monako.rajce.idnes.cz/terlicko_nss_machalik_170929/' }
		]
	},
	{
		year: 2016,
		results: { type: 'download' },
		articles: [
			{
				label: 'minisail.cz',
				url: 'https://www.minisail.cz/setkani/z-akci/id:6783/zaver-sezony-terlicko-2016'
			}
		],
		gallery: [
			{ label: 'Rajce-Ferodedek', url: 'https://minisail.rajce.idnes.cz/Terlicko_2016/' },
			{ label: 'Rajce-MoNaKo', url: 'https://monako.rajce.idnes.cz/terlicko_nss_160929/' },
			{
				label: 'Drive-Seb',
				url: 'https://drive.google.com/drive/folders/1d_RC8fPRuFfclPdS7at1Q_6uMBAIiKaw?usp=share_link'
			}
		]
	},
	{
		year: 2015,
		results: { type: 'download', url: '/vysledky/vysledky-2015.xlsx' },
		articles: [
			{
				label: 'minisail.cz',
				url: 'https://www.minisail.cz/setkani/z-akci/id:4495/terlicko-zamykani-2015'
			}
		],
		gallery: [
			{ label: 'Rajce-Ferodedek', url: 'https://minisail.rajce.idnes.cz/Terlicko_2015/' },
			{ label: 'Rajce-MoNaKo', url: 'https://monako.rajce.idnes.cz/terlicko_nss_150925/' },
			{ label: 'Rajce-MoNaKo-2', url: 'https://monako.rajce.idnes.cz/terlicko_nss_150924/' }
		]
	},
	{
		year: 2014,
		results: { type: 'download' },
		articles: [],
		gallery: [
			{ label: 'daja-se.rajce.idnes.cz', url: 'https://daja-se.rajce.idnes.cz/Terlicka_plachta/' },
			{ label: 'modelteam.com.pl', url: 'www.modelteam.com.pl/galeria/thumbnails.php?album=166' }
		]
	},
	{
		year: 2013,
		results: { type: 'new', url: '/vysledky/2013/' },
		articles: [
			{
				label: 'minisail.cz',
				url: 'https://www.minisail.cz/setkani/z-akci/id:2524/terlicko-2013-pozdni-setkani-'
			}
		],
		gallery: [
			{ label: 'Rajce-Ferodedek', url: 'https://minisail.rajce.idnes.cz/Terlicko_2013/' },
			{ label: 'Rajce-MoNaKo', url: 'https://monako.rajce.idnes.cz/terlicko_nss_131011/' },
			{ label: 'Rajce-MoNaKo-2', url: 'https://monako.rajce.idnes.cz/terlicko_nss_131013/' },
			{ label: 'modelteam.com.pl', url: 'http://www.modelteam.com.pl/galeria/thumbnails.php?album=165' }
		]
	},
	{
		year: 2012,
		results: { type: 'download', url: '/vysledky/2012/2012comp.pdf' },
		articles: [
			{ label: 'minisail.cz', url: 'https://www.minisail.cz/setkani/z-akci/id:2481/terlicko-2012' }
		],
		gallery: [
			{
				label: 'moravskoslezsky.denik.cz',
				url: 'https://moravskoslezsky.denik.cz/z-regionu/obrazem-soutez-radiem-rizenych-modelu-plachetnic-20120929.html'
			},
			{ label: 'terlicko.cz', url: 'http://terlicko.cz/terlicka-plachta-2012-09-28-30/gs-1062' },
			{ label: 'Rajce-Ferodedek', url: 'https://minisail.rajce.idnes.cz/Terlicko_2012/' },
			{ label: 'modelteam.com.pl', url: 'http://www.modelteam.com.pl/galeria/thumbnails.php?album=149' }
		]
	},
	{
		year: 2011,
		results: { type: 'download', url: '/vysledky/2011/2011comp.pdf' },
		articles: [
			{
				label: 'minisail.cz',
				url: 'https://www.minisail.cz/setkani/z-akci/id:2438/terlicko-zamykani-2011'
			}
		],
		gallery: [
			{ label: 'modelteam.com.pl', url: 'http://www.modelteam.com.pl/galeria/thumbnails.php?album=127' }
		]
	}
];
