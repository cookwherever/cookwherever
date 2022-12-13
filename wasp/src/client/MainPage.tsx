import {useQuery} from '@wasp/queries'
import logout from '@wasp/auth/logout.js';
import RecipesList from "./recipe/RecipesList";
import {typedListRecipes} from "./types/queries";

const MainPage = ({ user: any }) => {
  const { data, isFetching, error } = useQuery(typedListRecipes)

  return (
    <div>
      {data?.recipes && <RecipesList recipes={data.recipes} />}

      {isFetching && 'Fetching...'}
      {error && 'Error: ' + error}
      <button onClick={logout}> Logout </button>
    </div>
  )
}

export default MainPage
