import Header from "./components/Header";
import RepositoryCard from "./components/RepositoryCard";
import StatCard from "./components/StatCard";
import { useReducer } from "react";

const initialState = {
  repository: null,
  error: null,
  loading: null,
  search: null,
  result: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        search: {
          ...state.search,
          [action.payload.repo]: action.payload.value,
        },
      };
    case "GITHUB_REQUEST":
      return {
        ...state,
        loading: { ...state.loading, [action.payload.repo]: true }, // set whatever repository is loading to true
        repository: { ...state.repository, [action.payload.repo]: null }, // clear existing repository
        result:  null , // clear existing result
        error: { ...state.error, [action.payload.repo]: null }, // set error to numm for repository
      };
    case "GITHUB_ERROR":
      return {
        ...state,
        error: { ...state.error, [action.payload.repo]: action.payload.value }, // set whatever repository failure to error message
        loading: { ...state.loading, [action.payload.repo]: false }, // set whatever repository is loading to false
      };
    case "GITHUB_SUCCESS":
      return {
        ...state,
        repository: {
          ...state.repository,
          [action.payload.repo]: action.payload.value,
        }, // set response from repository to state
        error: { ...state.error, [action.payload.repo]: null }, // set error to numm for repository
        loading: { ...state.loading, [action.payload.repo]: false }, // set whatever repository is loading to false
      };
    case "GENERATE_RESULT":
      const repo = state.repository
      let result = null;
      if(repo) {
        const firstRepo = repo.first;
        const secondRepo = repo.second;
        if(firstRepo && secondRepo) {
          const starResult = {
            first: returnMaxVal(firstRepo.stargazerCount, secondRepo.stargazerCount),
            second: returnMaxVal(secondRepo.stargazerCount, firstRepo.stargazerCount)
          }
          const forkResult = {
            first: returnMaxVal(firstRepo.forkCount, secondRepo.forkCount),
            second: returnMaxVal(secondRepo.forkCount, firstRepo.forkCount)
          }
          const watcherResult = {
            first: returnMaxVal(firstRepo.watchers.totalCount, secondRepo.watchers.totalCount),
            second: returnMaxVal(secondRepo.watchers.totalCount, firstRepo.watchers.totalCount)
          }
          const issueResult = {
            first: returnMaxVal(firstRepo.issues.totalCount, secondRepo.issues.totalCount),
            second: returnMaxVal(secondRepo.issues.totalCount, firstRepo.issues.totalCount)
          }
          result = [
            starResult,
            forkResult,
            watcherResult,
            issueResult
          ]
        }
      }
      console.log('result', result)
      return {
        ...state,
        result: result, // set the new result everytime its called
      };

    default:
      return state;
  }
}

function returnMaxVal(valA, valB) {
  let val = 0;
  if(valA >= valB) val = 1;

  return val;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const customDispatcher = (type, payload) => {
    dispatch({ type, payload });
  };
  const inputChange = (e) => {
    customDispatcher("INPUT_CHANGE", {
      repo: e.target.name,
      value: e.target.value,
    });
  };
  const fetchRepository = (index) => {
    customDispatcher("GITHUB_REQUEST", { repo: index });
    const val = state.search[index];
    const repositoryName = val.substring(val.indexOf("/") + 1);
    const repositoryOwner = val.substring(0, val.indexOf("/"));
    fetch(`${process.env.REACT_APP_GITHUB_API_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: `query { repository(name: "${repositoryName}", owner: "${repositoryOwner}"), {id,description,forkCount,isPrivate,name,nameWithOwner,stargazerCount,watchers {totalCount},issues {totalCount}}}`,
      }),
    })
      .then(async (res) => {
        const response = await res.json();
        if(response.errors) {
          let errorMsg = ''
          response.errors.forEach(error => {
            errorMsg += error.message + '\n';
          })
          customDispatcher("GITHUB_ERROR", {
            repo: index,
            value: errorMsg,
          });
        } else {
          if(response.data.repository) {
            customDispatcher("GITHUB_SUCCESS", {
              repo: index,
              value: response.data.repository,
            });
          } else {
            customDispatcher("GITHUB_ERROR", {
              repo: index,
              value: "Repository not available",
            });
          }
          
        }
      })
      .catch((err) => {
        console.log(err);
        customDispatcher("GITHUB_ERROR", {
          repo: index,
          value: "Something went wrong",
        });
      }).finally(() => {
        customDispatcher("GENERATE_RESULT", null);
      });
  };
  return (
    <div className="relative bg-gray-200 h-screen overflow-hidden p-4">
      <Header />
      <div className="flex">
        <RepositoryCard
          index={"first"}
          state={state}
          inputChange={inputChange}
          fetchRepository={fetchRepository}
        />
        <StatCard state={state} />
        <RepositoryCard
          index={"second"}
          state={state}
          inputChange={inputChange}
          fetchRepository={fetchRepository}
        />
      </div>
      <div className="py-8">
        <p className="text-sm text-center">Developed by <a href="https://zadatolayinka.dev" rel="noreferrer" target="_blank">Bundayy</a></p>
      </div>
    </div>
  );
}

export default App;
