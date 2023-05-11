import styles from "./Recommend.module.css";

function RecommendAuthor(props) {
  const recommendAuthorHandler = () => {};

  return (
    <button className={styles["btn-author"]} onClick={recommendAuthorHandler}>
      More by this author
    </button>
  );
}

export default RecommendAuthor;
