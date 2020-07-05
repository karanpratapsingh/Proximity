import { useQuery } from '@apollo/react-hooks';

import { QUERY_POSTS } from '@app/graphql/query';
import { Pagination } from '@app/constants';

export default function useExploreFeed(userId: string) {
  const defaultInput = {
    userId,
    last: Pagination.PAGE_SIZE,
  };

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    fetchMore,
    refetch: refetchPosts,
  } = useQuery(QUERY_POSTS, {
    variables: defaultInput,
  });

  const fetchMorePosts = async () => {
    const { posts } = postsData;
    const variables = {
      ...defaultInput,
      last: posts.length + Pagination.CURSOR_SIZE,
    };

    const updateQuery = (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) return prev;
 
      return { posts: [...fetchMoreResult.posts] };
    };

    if (fetchMore) {
      // @ts-ignore
      fetchMore({ variables, updateQuery });
    }
  };

  return { postsData, postsLoading, postsError, fetchMorePosts, refetchPosts };
}
