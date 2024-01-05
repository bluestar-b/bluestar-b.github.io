async function getWeather() {
  const apiKey = process.env.NEXT_OWM_KEY
  const city = "Lop Buri, TH"
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Fetch GET error:`, error)
    throw error
  }
}

export default async function Weather() {
  const data = await getWeather()
  const temperature = data.main.temp
  const location = `${data.name}, ${data.sys.country}`
  console.log(data)
  return (
    <div>
      {location}, {temperature}°C
    </div>
  )
}
