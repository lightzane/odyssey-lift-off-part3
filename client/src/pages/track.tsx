import { useParams } from 'react-router-dom';
import { Layout, QueryResult } from '../components';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import TrackDetail from '../components/track-detail';

export const GET_TRACK = gql(`
    query GetTrack($trackId: ID!) {
        track(id: $trackId) {
            id
            title
            author {
                id
                name
                photo
            }
            thumbnail
            length
            modulesCount
            numberOfViews
            modules {
                id
                title
                length
            }
            description
        }
    }
`);

const Track = () => {
  const { trackId = '' } = useParams();
  const { loading, error, data } = useQuery(GET_TRACK, {
    variables: { trackId },
  });
  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        {/* this is where our component displaying the data will go */}
        <TrackDetail track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Track;