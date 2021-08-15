//ここっから
import Image from 'next/image';
import Link from 'next/link';
import companyIcon from 'public/company.png';
import { useEffect, useState } from 'react';
import { Addcompany } from './addCompany';
// import { Addcompany } from './AddCompany';

export const CompanyList = (props) => {
  // const [searchCompany, setSearchCompany] = useState({});
  // const [loading, setLoading] = useState(true);
  // console.log(props);
  // console.log('11');
  // useEffect(() => {
  //   async () => {
  //     if (props.allData !== undefined) {
  //       const searchCompany = await props.allData.filter((company) => {
  //         let searchContent =
  //           company['company_name'] +
  //           ' ' +
  //           company['URL'] +
  //           ' ' +
  //           company['access'] +
  //           ' ' +
  //           company['capital_stock'] +
  //           ' ' +
  //           company['company_address'] +
  //           ' ' +
  //           company['work'];
  //         return setSearchCompany(
  //           searchContent.toLowerCase().includes(props.filterText.toLowerCase())
  //         );
  //       });
  //       // if (searchCompany) {
  //       //   setLoading(false);
  //       //   console.log('setLoading(false);');
  //       // }
  //     } else {
  //       props.getCompanyList();
  //       console.log(' props.getCompanyList();');
  //     }
  //   };

  //   return () => {
  //     // cleanup;
  //   };
  // }, []);

  const searchCompany = props.allData.filter((company) => {
    let searchContent =
      company['company_name'] +
      ' ' +
      company['URL'] +
      ' ' +
      company['access'] +
      ' ' +
      company['capital_stock'] +
      ' ' +
      company['company_address'] +
      ' ' +
      company['work'];
    return searchContent.toLowerCase().includes(props.filterText.toLowerCase());
  });

  console.log(props.allData);
  console.log('props.allData');

  console.log(searchCompany.length);
  console.log('searchCompany');
  if (searchCompany.length !== undefined) {
    return (
      <div className="grid grid-cols-3 gap-2 m-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
        {/* {console.log(searchCompany)}
      {console.log('外外外')} */}
        <Addcompany uuid={props.uuid} getCompanyList={props.getCompanyList} />
        {searchCompany.map((company) => {
          return (
            <Link
              key={company.company_id}
              href={`/companyInfo?id=${company.company_id}`}
              passHref
              userId={props.uuid}
            >
              <div className="p-2 border cursor-pointer">
                <div className="flex justify-center">
                  {company.URL ? (
                    <div>
                      <Image
                        src={`http://capture.heartrails.com/126x200/cool?${company.URL}`}
                        width={126}
                        height={200}
                        alt="CompanyThumbnail"
                      />
                    </div>
                  ) : (
                    <Image
                      src={companyIcon}
                      alt="NoThumbnail"
                      width={126}
                      height={200}
                    />
                  )}
                </div>
                <div className="mt-2 text-center">
                  {company['company_name']}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return <>{props.children}</>;
};
