import { useRouter } from 'next/router';
import Router from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from 'utils/supabaseClient';
import Image from 'next/image';
const Account = () => {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [prof, setProf] = useState({});
  let { id } = router.query;

  const getProf = async (id) => {
    console.log(id);
    if (id) {
      const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('user_id', id)
        .single();

      setProf(data);
    }
  };
  const back = useCallback(() => {
    Router.back();
  }, []);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);

      if (error) {
        throw error;
      }
      // const url = URL.createObjectURL(data);
      // console.log(url);
      // console.log('urlurl');

      let reader = new FileReader();
      reader.readAsDataURL(data); // blob を base64 へ変換し onload を呼び出します

      reader.onload = function () {
        // link.href = reader.result; // data url
        setAvatarUrl(reader.result);
        // link.click();
      };

      // setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  }

  useEffect(() => {
    const data = getProf(id);
  }, [id]);

  useEffect(() => {
    if (prof.avatar_url) {
      downloadImage(prof.avatar_url);
    }
  }, [prof.avatar_url]);
  console.log(prof);
  console.log(prof.avatar_url);
  console.log('prof.avatar_url');
  if (prof && avatarUrl) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className=" bg-white  mx-auto shadow-lg rounded-lg hover:shadow-xl transition duration-200 max-w-sm">
          <div className="w-full text-left mb-3 flex items-center">
            {/* <img
              className="w-24 h-24 inline-block object-cover rounded-full"
              alt="CompanyIcon"
              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
            ></img> */}
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar"
                className="w-24 h-24 inline-block object-cover rounded-full"
                // className="w-12 min-w-3rem"
                width={80}
                height={80}
              />
            ) : (
              <Image
                // className="w-12 min-w-3rem "
                src="/human.png"
                alt="NoAvatar"
                width={80}
                height={80}
              />
            )}
            <div className="font-bold text-4xl"> {prof.user_name}</div>
          </div>
          <div className="py-4 px-8">
            <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">
              Age {prof.age}
            </p>
            <div className="hover:cursor-pointer mt-2 text-gray-900 font-bold text-2xl tracking-tight">
              {prof.remarks} Lorem ipsum dolor sit amet consectetur adipisicing
              elit.{' '}
            </div>
          </div>
          <div className="flex">
            <div className="text-right">
              <button
                onClick={back}
                className="text-lg block font-semibold py-2 px-6 text-white hover:text-green-100 bg-green-400 rounded-lg shadow hover:shadow-md "
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};
export default Account;
