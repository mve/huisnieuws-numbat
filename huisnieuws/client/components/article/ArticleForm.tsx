import React, { useCallback, useEffect, useState } from 'react';
import TextInput from '../form/TextInput';
import TextAreaInput from '../form/TextAreaInput';
import FileInput from '../form/FileInput';
import { checkLength } from '../../support/checker';
import { zipcodeIsValid } from '../../support/zipcode';
import UploadedImage from '../form/UploadedImage';
import { Reach } from '../../enums/reach';
import ReachSelector from '../core/ReachSelector';
import TagSelector from '../core/TagSelector';
import Sidebar from '../core/Sidebar';

type inputErrors = {
  zipcode: string | null,
  title: string | null,
  image: string | null,
};

type Props = {
  onSubmit: Function,
  errors: inputErrors | null,
};

export const ArticleForm: React.FC<Props> = ({ onSubmit, errors }) => {
  const [title, setTitle] = useState<string>('');
  const [zipcode, setZipcode] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [reach, setReach] = useState<Reach>(Reach.STREET);
  const [tags, setTags] = useState<Array<any>>([]);

  const fieldsSet = useCallback((): boolean => (
    !!title && !!zipcode && !!text && !!image
  ), [title, zipcode, text, image]);

  const fieldsValid = useCallback((): boolean => (
    checkLength(title, 5, 100) && zipcodeIsValid(zipcode) && fieldsSet()
  ), [title, zipcode, fieldsSet]);

  const onUpload = ({ target: { files } }) => {
    if (!files || !files[0]) return;

    const uploadedImage = files[0];

    setImage(uploadedImage);
    setImageUrl(URL.createObjectURL(uploadedImage));
  };

  useEffect(() => setValid(fieldsValid()), [title, zipcode, text, image, fieldsValid]);

  return (
    <div className="flex-col lg:flex lg:flex-row lg:justify-between">
      <form
        className="flex flex-col max-w-xl mb-5"
        onSubmit={(e) => {
          e.preventDefault();
          const formatTags = tags.map((tag) => ({ name: tag.label, color: tag.color }));
          onSubmit(title, zipcode, text, image, reach, formatTags);
        }}
      >
        <ReachSelector
          selected={reach}
          onChange={setReach}
          title="Kies het bereik waarin het bericht te zien moet zijn"
        />

        <TagSelector
          title="Kies tags die bij uw bericht passen"
          onChange={setTags}
          maxAmountTags={3}
          selected={[]}
        />

        <TextInput
          value={title}
          name="title_input"
          label="Titel"
          placeholder="Titel"
          instruction="min 5 - max 100"
          onChange={setTitle}
          classes=""
        />

        <TextInput
          value={zipcode}
          name="postcode_input"
          label="Postcode"
          placeholder="1234 AB"
          instruction="4 cijfers 2 letters: 1111 AA"
          onChange={setZipcode}
          classes={errors?.zipcode}
        />

        <TextAreaInput
          value={text}
          name="inhoud_input"
          label="Inhoud"
          placeholder="Schijf hier de inhoud van uw artikel"
          onChange={setText}
        />

        {imageUrl !== '' && <UploadedImage url={imageUrl} />}

        <FileInput onUpload={onUpload} classes={errors?.image} />

        <button
          disabled={!valid}
          type="submit"
          className="disabled:opacity-50 disabled:cursor-not-allowed max-w-[12rem] inline-flex justify-center mb-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Plaatsen
        </button>
      </form>
      <Sidebar
        reach={zipcodeIsValid(zipcode) && (reach)}
        zipcode={zipcodeIsValid(zipcode) && (zipcode)}
        articles={[]}
      />
    </div>
  );
};
export default ArticleForm;
