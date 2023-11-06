import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const InputProperties = ({properties,setProperties}) => {
  return <section>
  <h2>
    Put your properties file here
  </h2>
  <input className='resizable' value={properties} onChange={e=>setProperties(e.target.value)} />
  </section>
}

const computePropertiesFile = (properties) => {
  const computeLines = (properties) => {
    return properties.includes("\n") ? properties.split("\n") : [properties]
  }
  const computeKey = (key) => {
    return key.toUppercase()
  }
  const computeValue = (lineValue) => {
    return lineValue.includes("=") ? new Object({'key':computeKey(line.split("=")[0]),'value': line.split("=")[1]}) : lineValue
  }
  const reduce = (computedLine) => {
    return typeof computedLine === "object" ? `${computedLine.get('key')}=${computedLine.get('value')}` : computedLine
  }
  return computeLines(properties).map(line => computeValue(line)).reduce((accumulator,line) => accumulator + "\n" + reduce(line))
}

const PropertiesRenderer = ({properties}) => {
  return <section><h2>Result</h2><div>{computePropertiesFile(properties)}</div></section>
}
function App() {
  const [properties,setProperties] = useState("")
  return (
    <>
     <h1>
      Spring Properties to Env variable converter
     </h1>
     <InputProperties properties={properties} setProperties={setProperties}/>
     {properties !== "" && 
     <PropertiesRenderer properties={properties}/>
     }
    </>
  )
}

export default App
