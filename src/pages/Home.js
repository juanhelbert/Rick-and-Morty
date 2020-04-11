import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Card } from '../atoms/Card'
import { Loader } from '../atoms/Loader'

const GET_CHARACTERS = gql`
query ($page: Int, $query: String) {
  characters (page: $page, filter: { name: $query }) {
    info {
      count
      prev
      next
    }
    results {
      id
      name
      gender
      status
      image
      species
      episode {
        id
      }
    }
  }
}
`;

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(
    GET_CHARACTERS,
    { variables: { page: page, query: searchQuery } }
  )

  const prev = data && data.characters.info.prev
  const next = data && data.characters.info.next

  useEffect(() => {
    setPage(1)
  }, [searchQuery])

  return (
    <>
      <header>
        <div className='container'>
          <form onSubmit={(e) => (setSearchQuery(query), e.preventDefault())}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="search" placeholder='Search by name' />
            <input type="submit" value="Search" className='btn' /><br />
            {(data && !error && !loading) &&
              <p><b>{data.characters.info.count} characters were found </b></p>
            }
          </form>
        </div>
      </header>

      <main className='container'>
        <section className={`cards-wrapper ${error ? 'flex' : 'grid'}`}>
          {error ? <b>No matches for your query</b>
            : data && data.characters && data.characters.results.map(item => (
              item.id && <Card key={item.id} data={item} />
            ))}
        </section>

        <section className='load-more'>
          {loading ? <Loader />
            : !error && (
              <>
                {prev &&
                  <button style={{ marginRight: '15px' }} onClick={() => setPage(data.characters.info.prev)}>
                    {'< pev'}
                  </button>}
                {next &&
                  <button onClick={() => setPage(data.characters.info.next)}>
                    {'next >'}
                  </button>}
              </>
            )
          }
        </section>
      </main>
    </>
  )
}
