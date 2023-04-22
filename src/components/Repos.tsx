import React from "react"
import styled from "styled-components"
import { useGlobalGithubContext } from "../context/context"
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts"
type Repos = {
  repos: {
    language: string
    stargazers_count: number
    name: string
    forks: number
  }[]
}
const Repos = () => {
  const { repos } = useGlobalGithubContext() as Repos

  // get Languages
  const languages = repos.reduce((total: any, item) => {
    const { language, stargazers_count } = item
    if (!language) return total
    if (!total[language]) {
      total[language] = {
        label: language,
        value: 1,
        stars: stargazers_count > 0 ? stargazers_count : 1,
      }
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }
    return total
  }, {})
  // most Used Languages , most Stared Languages
  let mostUsed: { value: number; stars: number }[] = Object.values(languages)
  let mostStared = mostUsed.map((item) => {
    return { ...item, value: item.stars }
  })

  mostUsed.sort((a, b) => b.value - a.value)
  mostStared.sort((a, b) => b.value - a.value)
  const mostUsedLanguages = mostUsed.slice(0, 5)
  const mostStaredLanguages = mostStared.slice(0, 5)
  // console.log(mostUsed)

  const { stars, forks } = repos.reduce(
    (total: any, item) => {
      const { stargazers_count, name, forks } = item
      if (stargazers_count > 0) {
        total.stars[stargazers_count] = {
          label: name,
          value: stargazers_count,
        }
      }

      if (forks > 0) {
        total.forks[forks] = {
          label: name,
          value: forks,
        }
      }

      return total
    },
    {
      stars: {},
      forks: {},
    }
  )
  const mostStars: object[] = Object.values(stars)
  const mostForks: object[] = Object.values(forks)
  const mostStaredRepos = mostStars.slice(-5)
  mostForks.slice(-5)
  const mostForksRepos = mostForks.reverse()

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsedLanguages} />
        <Column3D data={mostStaredRepos} />
        <Doughnut2D data={mostStaredLanguages} />
        <Bar3D data={mostForksRepos} />
        <div></div>
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
