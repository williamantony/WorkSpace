const importScript = (url) => {

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  script.defer = true;

  document.body.appendChild(script);

};