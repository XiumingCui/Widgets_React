import React, { useEffect, useState } from "react";
import axios from "axios";

const Convert = ({ language, text }) => {
  const [translatedText, setTranslatedText] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 200);

    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
          },
        }
      );
      console.log(debouncedText);
      console.log(data.data);
      setTranslatedText(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [language, debouncedText]);

  return <h1 className="ui header">{translatedText}</h1>;
};

export default Convert;
