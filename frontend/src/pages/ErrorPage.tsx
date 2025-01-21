const  ErrorPage = () => {
  return(
    <div className="flex flex-col items-center text-center h-full">
      <h1 className={"text-4xl text-red-500 font-bold"}>An error occured</h1>
      <img src={"https://http.cat/404"} alt={"error image"} className={"w-full md:h-5/6"} />
    </div>
  );
};

export default ErrorPage;