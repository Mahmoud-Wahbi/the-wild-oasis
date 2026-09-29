function Empty({ resourceName, customText }) {
  if (customText) {
    return <p>{customText}</p>;
  } else {
    return <p>No {resourceName} could be found.</p>;
  }
}

export default Empty;
