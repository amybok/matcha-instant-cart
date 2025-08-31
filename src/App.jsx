import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
	const [search, setSearch] = useState('')
	
	const [results, setResult] = useState([])

	const [cartItem, setCart] = useState([])

	let nextId = 0;

	const [txt, setTxt] = useState('')

	useEffect(() => {
		setCart(cartItem)
	}, [txt])

	const mockData = [
		{
			"id": 7061894135945,
			"title": "ティーバッグ　煎茶",
			"handle": "teabag-sencha",
			"body_html": "\u003Cp\u003Eこだわりの茶葉を手軽に飲んで頂けるようティーバッグにお詰めいたしました。\u003C/p\u003E\n\u003Cp\u003E \u003C/p\u003E\n\u003Cp\u003Eティーバッグは通常、粉茶や細かく刻んだ茶葉を使用しますが、当園では茶葉を細かく刻み過ぎず、できるだけ本来の形状を残しております。また茶葉は選りすぐりの良いものを使用しているので急須で淹れた際同様の本格的なお煎茶が楽しめます。甘みと渋味が程よく調和し、高い香りが特徴です。湯呑用サイズです。\u003C/p\u003E",
			"published_at": "2025-08-16T18:25:25+09:00",
			"created_at": "2022-10-20T15:14:03+09:00",
			"updated_at": "2025-08-30T17:59:20+09:00",
			"vendor": "堀井七茗園",
			"product_type": "",
			"tags": [],
			"variants": [
				{
					"id": 40895624151177
				}
			],
			"images": [
				{
					"src": "https://cdn.shopify.com/s/files/1/0566/5308/6857/products/TB1.jpg?v=1666257738"
				}
			]
		} 
	]

	const handleSearch = async (event) => {
		
		event.preventDefault()
		const url = `https://horiishichimeien.com/en/collections/抹茶/products.json`;
		try {
			const response = await fetch(url);
		
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const data = await response.json();

			const items = data.products

			console.log(items[0].images[0].src)

			const result = items.map((item) => {
				//console.log(item.images[0].src)
				return {
					id: item.id,
					title: item.title,
					handle: item.handle,
					variant_id: item.variants[0].id,
					price: item.variants[0].price,
					image: item.images[0].src
				}
			})

			console.log(result)

			setResult(result);
			console.log(result)

		} catch (error) {
			console.error(error.message);
		}
		
	}

	const addToLink = (itemVariant) => {
		setCart([
			...cartItem,
			{id: nextId++, variant: itemVariant}
		])
		
		console.log(cartItem)

		cartItem.map((item) => {
			setTxt(txt + item.variant + ":1,")
		})
		console.log(txt)
	}

	return (
		<div>
			<form onSubmit={handleSearch}>
				<h1 style={{}}>Grab ur matcha!</h1>
				<input style={{backgroundColor:"rgb(255,255,255, 0.87)", borderRadius:"0.5em", padding:"0.2em 1.2em"}} type="text" 
				onChange={(event) => setSearch(event.target.value)}/>
				<button type='submit' style={{padding:"0.2em 0.8em", marginLeft:"1em", border:"1px solid white"}}>Search</button>
			</form>
			<h3>Click your checkout link</h3>
			<div style={{display:"flex", justifyContent:"center"}}>
				<div style={{border:"solid 1px grey", borderRadius:"5px", paddingLeft:"15px", paddingRight:"15px", backgroundColor:"dimgrey",maxWidth:"450px", overflow:"scroll"}}>

					<a href={`https://horiishichimeien.com/en/cart/${txt}`} style={{color:"white"}}>
						{`https://horiishichimeien.com/en/cart/${txt}`}
					</a>
				</div>
				<button onClick={() => {navigator.clipboard.writeText(`https://horiishichimeien.com/en/cart/${txt}`)}}
				style={{padding:"0.2em 0.8em", marginLeft:"1em", border:"1px solid white"}}>Copy for later</button>
			</div>
			<ul style={{padding:0, display:"flex", flexWrap:"wrap", flexDirection:"row", listStyle:"none"}}>
				{results.map((result) => {
					return (
						<li style={{maxWidth: "20em", minHeight: "20em", margin:0, padding:0, alignItems:"stretch"}}>
							<a href={`https://horiishichimeien.com/products/${result.handle}`} style={{color:"black", textDecoration:"underline"}}>
								<h3>{result.title}</h3>
							</a>
							<p>Variant ID: {result.variant_id} 
								<button onClick={() => addToLink(result.variant_id)}
								style={{backgroundColor:"dimgray", padding:"0.3em 0.6em", marginTop:"0.2em", marginLeft:"0.5em"}}>+</button>
								<br/>
								Price: {result.price} yen</p>
							<img src={result.image} alt={result.title} width='50%' height='50%' style={{borderRadius:"2.2em"}}/>
						</li>
					)
				}) }
			</ul>
		</div>
	)
}

export default App
