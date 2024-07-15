"use client";

import { useEffect, useRef, useState } from "react";
import CoverPage from "./CoverPage";
import SubsequentPage from "./SubsequentPage";
import { useAppSelector } from "@/lib/hooks";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";

interface OutgoingLetterPrintPreviewProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

const SAMPLE_CONTENT: string =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit a condimentum, conubia sagittis senectus phasellus metus semper ultricies sed, cras inceptos penatibus ad ornare dis natoque curabitur. Fermentum id nullam suscipit iaculis sapien lacus tellus vestibulum parturient viverra, cursus egestas justo interdum vivamus est habitasse dui urna nascetur, congue venenatis pretium maecenas diam nibh sollicitudin nisl fames. Purus massa eu dictumst ante cum dignissim facilisi ridiculus bibendum, erat accumsan feugiat donec nostra posuere morbi lacinia mattis, aliquam nunc integer placerat convallis lobortis taciti cubilia. Tempus etiam velit fringilla suspendisse scelerisque himenaeos ullamcorper potenti rhoncus sociosqu, ac porttitor nam rutrum sociis turpis ligula eget magna, risus praesent tortor tempor mi sodales mauris facilisis quisque. Aliquet tristique magnis libero in nec platea vitae blandit, vulputate eleifend malesuada felis dictum laoreet pellentesque auctor hendrerit, aptent arcu ultrices lectus enim pharetra porta. Class consequat litora dapibus mollis vel nulla molestie duis leo, commodo netus quam at per varius pulvinar torquent montes, euismod faucibus sem quis mus gravida volutpat curae. Ut et nisi imperdiet odio aenean primis, non neque hac habitant augue luctus, vehicula fusce orci proin elementum. Tincidunt eros ornare et class gravida consequat platea ante, elementum nullam lectus enim aenean porttitor netus felis, ac nibh egestas luctus facilisi a suscipit. Est sagittis maecenas ultricies vestibulum odio bibendum sed vitae nam at, lobortis mollis auctor eget rhoncus tristique fringilla non montes, lacus mus laoreet viverra eros curabitur metus id penatibus. Fusce quam taciti purus turpis per convallis accumsan, imperdiet semper litora cras praesent malesuada, facilisis dignissim sodales donec nunc commodo. Quis hendrerit proin ligula dui primis faucibus habitasse sapien mi feugiat tellus himenaeos nec, in tempus vehicula molestie venenatis sem natoque pharetra fermentum dis risus. Ultrices volutpat tempor senectus pulvinar cum libero, parturient ut neque inceptos dictum, varius pellentesque dapibus etiam aliquet. Phasellus leo ad sociosqu aptent arcu nostra magna massa sollicitudin, eu tortor ullamcorper conubia condimentum velit eleifend congue porta dictumst, pretium curae vulputate vel tincidunt duis sociis mattis. Lacinia justo nascetur mauris fames potenti placerat orci urna posuere rutrum, quisque erat integer morbi hac euismod iaculis interdum suspendisse cursus magnis, cubilia ridiculus augue scelerisque torquent nisl diam vivamus aliquam. Nulla blandit nisi habitant nascetur accumsan, nec ornare porta hendrerit ante sem, mi rhoncus etiam phasellus. Curabitur dignissim aliquet feugiat habitasse tincidunt sollicitudin egestas turpis est sagittis, arcu urna porttitor suspendisse scelerisque facilisi posuere interdum donec eu conubia, nostra metus sodales quisque nulla erat luctus primis laoreet. Cubilia ad elementum enim augue varius potenti molestie vulputate velit, auctor curae senectus fermentum mollis praesent imperdiet non leo venenatis, massa justo pellentesque sociosqu nibh quam orci neque. Pharetra eleifend nullam sociis magna nunc ultricies eget platea purus, suscipit class libero mus fusce pulvinar faucibus nisl. A vitae habitant lacinia rutrum fames dictumst tellus dictum himenaeos congue commodo nisi, sapien blandit diam quis vehicula felis natoque fringilla mattis aliquam. Aptent id cum taciti risus aenean consequat ut hac montes sed torquent, viverra et nam proin ullamcorper penatibus ridiculus mauris euismod ligula. Iaculis per semper parturient eros maecenas condimentum, ultrices bibendum cras vel gravida netus, placerat vivamus lectus duis lacus tempor, dui vestibulum volutpat cursus magnis. Litora dis in dapibus tempus malesuada lobortis morbi at integer pretium, convallis tristique ac odio facilisis tortor inceptos nulla risus, nam sagittis in tellus rutrum pretium a felis libero. Magnis dictumst primis per dictum sollicitudin ad nisi, auctor ullamcorper tempus sed blandit faucibus rhoncus, lectus nunc laoreet sociis lacus erat. Pellentesque augue morbi maecenas habitasse litora vulputate venenatis habitant, suspendisse gravida sodales suscipit commodo lobortis placerat penatibus, nascetur bibendum nostra mattis viverra purus quis. Senectus scelerisque fringilla turpis dapibus volutpat euismod massa nec natoque platea justo, eros duis odio porta himenaeos fermentum cursus nullam ut hac. Tincidunt proin semper tortor aliquet convallis mi metus parturient potenti imperdiet, sociosqu ligula praesent sem ridiculus congue cum montes feugiat tristique, curabitur fames et tempor pulvinar nisl quisque diam at. Donec cubilia netus ultrices elementum aenean eleifend aliquam quam varius egestas, leo facilisis nibh iaculis condimentum ac arcu vehicula malesuada, neque lacinia aptent vestibulum vivamus interdum fusce conubia class. Mauris dis posuere eu dui ultricies hendrerit consequat dignissim, velit urna est etiam porttitor inceptos pharetra. Facilisi ante magna vel ornare accumsan taciti eget mus enim, orci mollis torquent luctus sapien molestie integer phasellus curae vitae, id non cras lacinia erat natoque tempus himenaeos. Penatibus rhoncus vivamus vestibulum orci duis consequat enim augue id, aptent lobortis non sollicitudin urna ante nascetur molestie tincidunt, diam scelerisque risus felis maecenas integer montes leo. Inceptos faucibus nunc vitae dignissim quam at dapibus sodales semper dis, ultrices mi proin senectus accumsan morbi eu ultricies porta egestas, tristique nisl tellus ac elementum fermentum magna sociis libero. Hac mollis ut ligula ridiculus aliquet auctor dictumst primis eros, curae cras nisi cum dictum justo fames varius, suspendisse ad eleifend quis imperdiet tempor turpis taciti. Etiam viverra sociosqu convallis conubia netus odio aenean habitant sagittis curabitur, sed blandit pulvinar quisque dui cubilia aliquam nullam pharetra, nulla sapien a hendrerit litora mus mattis nam suscipit. Vulputate et cursus praesent bibendum arcu volutpat metus massa, porttitor fusce nibh ullamcorper facilisi mauris gravida iaculis, nostra facilisis congue phasellus donec malesuada torquent. Lacus commodo tortor fringilla potenti vehicula purus laoreet nec est, rutrum pretium magnis ornare eget luctus per. Placerat lectus posuere class vel parturient sem venenatis velit, neque pellentesque interdum feugiat platea in habitasse, condimentum euismod ante ad aliquet suspendisse cum. Cubilia maecenas sociis per dui nibh porttitor magnis primis, vel netus curabitur suscipit malesuada lectus dictumst massa lacus, aliquam nullam laoreet non ut odio fames. Accumsan id mauris hendrerit feugiat euismod leo magna elementum, ac diam parturient cras mollis ligula duis, taciti turpis dignissim ultricies ullamcorper sociosqu consequat. Dapibus nec senectus vulputate tellus pellentesque, mattis quis posuere faucibus volutpat, conubia condimentum vitae vehicula. Scelerisque integer semper ornare facilisi, hac potenti. Enim rhoncus et nostra proin sodales phasellus arcu aenean habitasse lobortis neque est penatibus quam pretium, aptent erat justo natoque donec fusce felis viverra curae a sollicitudin metus inceptos velit. Dictum egestas blandit sem tortor congue orci sed morbi himenaeos pulvinar, mi litora sapien eros pharetra class nam imperdiet eget, vestibulum ultrices torquent convallis tincidunt venenatis at placerat risus. Habitant nascetur eleifend nisi montes bibendum urna purus, nisl tempus tempor quisque molestie nunc in tristique, libero iaculis auctor augue porta varius. Platea fringilla ridiculus eu nulla cursus lacinia rutrum fermentum, praesent mus interdum dis commodo luctus sagittis, vivamus gravida etiam facilisis curae urna himenaeos. Ac nec interdum fringilla dui potenti ad congue habitasse maecenas tempus morbi sed ultricies in laoreet tincidunt, quisque quam porttitor phasellus arcu tellus viverra sociis risus a curabitur natoque donec netus. Aptent taciti est felis sem consequat porta semper pharetra placerat suscipit, tortor dapibus sapien tempor nibh nulla auctor commodo pretium nunc, mus proin euismod penatibus dis tristique malesuada feugiat gravida. Nam primis magnis vehicula aliquet mi erat varius suspendisse facilisi, eros parturient ultrices etiam ligula torquent convallis pulvinar, fusce purus rutrum vel turpis ut magna venenatis. Eu cum orci habitant quis vulputate eleifend mattis sodales blandit sociosqu id facilisis, ridiculus vestibulum cursus condimentum aliquam iaculis scelerisque nisl ornare dictumst volutpat litora velit, fames at accumsan vitae pellentesque inceptos integer eget luctus bibendum nascetur. Fermentum per ante lobortis diam dictum lacus lacinia dignissim imperdiet aenean egestas, et nisi class senectus posuere nullam lectus enim rhoncus hac neque faucibus, conubia sagittis cubilia platea metus praesent montes ullamcorper mauris leo. Mollis libero duis sollicitudin odio elementum hendrerit massa vivamus augue cras molestie nostra, non justo semper quam vel felis orci litora arcu imperdiet. Sem suspendisse ultricies non feugiat cum inceptos taciti vehicula fusce class integer, ullamcorper nunc morbi porta nullam vivamus mus a odio placerat, natoque iaculis risus massa ad phasellus curae tincidunt lectus etiam. Sociosqu interdum curabitur molestie diam nulla sociis, ante tristique at hendrerit proin aptent dictumst, platea ornare habitasse lacus congue. Hac tempus consequat pulvinar posuere tellus ut praesent ac gravida et primis dui, dis metus tortor magna condimentum duis lacinia commodo sollicitudin urna. Potenti pellentesque donec rutrum mi vestibulum dictum ridiculus vulputate, cras sapien maecenas ligula cubilia magnis velit libero eros, viverra faucibus euismod erat ultrices dapibus cursus. Per suscipit nam turpis facilisis torquent habitant sed aliquet egestas est, auctor mattis in blandit facilisi eleifend lobortis luctus volutpat, accumsan rhoncus conubia nibh venenatis porttitor bibendum netus scelerisque. Nascetur fringilla nec himenaeos convallis malesuada justo, vitae quis aliquam nisl elementum mollis penatibus, fermentum senectus pretium fames sagittis. Nostra aenean id varius parturient eu eget mauris sodales nisi, tempor pharetra quisque enim neque laoreet augue dignissim leo, montes purus porta facilisis habitasse dui cum gravida. Nisl hac arcu fringilla hendrerit sagittis sed vulputate ultrices, interdum iaculis senectus velit dignissim aenean faucibus litora phasellus, sapien quam inceptos venenatis libero aptent eleifend. Egestas torquent congue proin praesent curabitur nulla ante pellentesque cursus lacinia scelerisque convallis laoreet, enim vehicula mauris volutpat tortor lobortis diam dis lectus imperdiet magnis. Lacus dapibus tincidunt vitae ullamcorper metus ornare feugiat viverra mi nam donec vel placerat conubia ultricies, rutrum sociosqu ad erat taciti quisque turpis sodales ligula maecenas sociis natoque porttitor dictumst. Bibendum mollis mattis penatibus tempus augue fusce quis justo etiam et, felis himenaeos ridiculus rhoncus in auctor sollicitudin integer. Curae est fames aliquet per nisi at blandit, montes aliquam neque semper orci tristique duis, pharetra habitant potenti consequat commodo malesuada. Nostra facilisi class pulvinar cras leo risus magna vivamus suscipit odio, fermentum tempor vestibulum morbi platea eros purus a mus urna, nec suspendisse tellus ac netus eget ut nascetur varius. Luctus id euismod pretium accumsan elementum nunc sem, nullam posuere massa primis condimentum non dictum molestie, nibh eu cubilia parturient purus rutrum. Porta praesent dapibus ad mus sollicitudin at diam duis varius orci, suscipit cum inceptos malesuada felis libero nullam faucibus senectus natoque, id ligula tristique eros nostra cubilia etiam magna sociosqu. Molestie tellus vitae blandit elementum proin lobortis sed leo, fames ullamcorper maecenas mollis quis taciti morbi mauris, platea justo mi curae pretium urna augue. Iaculis scelerisque convallis eleifend ut tincidunt sociis posuere, gravida imperdiet velit montes torquent sodales curabitur tempor, facilisi semper bibendum vehicula cursus fringilla. Aenean eu penatibus laoreet pellentesque lectus congue dictum nam, mattis fusce risus vivamus lacinia dis ante class neque, luctus potenti phasellus aliquet dictumst massa arcu. Commodo ac est et nec auctor tortor fermentum donec dui, vel consequat nibh euismod dignissim per accumsan litora enim, in turpis placerat odio eget suspendisse nisl volutpat. Feugiat sem ridiculus lacus interdum sagittis ultrices aptent aliquam condimentum, magnis hac porttitor non pharetra nulla erat nascetur, habitasse nunc a vestibulum parturient egestas tempus sapien. Quisque rhoncus ornare venenatis conubia metus cras primis, habitant hendrerit vulputate nisi integer pulvinar ultricies, viverra himenaeos facilisis quam netus mi. Cubilia nisi fringilla volutpat rhoncus nibh vehicula class quisque enim, hac euismod facilisis pulvinar at cursus risus himenaeos, viverra litora etiam arcu cras iaculis eros varius. Id malesuada nec auctor inceptos facilisi gravida mus scelerisque ac massa, convallis lacinia libero lacus in nulla senectus donec et, curabitur feugiat accumsan phasellus magnis lectus molestie per felis. Tempor nostra imperdiet nascetur sagittis ligula penatibus condimentum neque, sociosqu consequat ornare erat ultrices habitant metus dictum, mauris ante rutrum morbi sem vel suspendisse. Primis dictumst pharetra tellus fusce est hendrerit sollicitudin quam egestas, praesent porttitor justo fames dis aliquet maecenas nullam aliquam, mollis urna cum eget sapien tristique ultricies a. Velit dapibus platea faucibus vitae augue ut luctus torquent porta, leo orci nisl ridiculus odio taciti commodo ullamcorper ad, aenean suscipit magna sodales curae bibendum pretium semper. Nunc non vulputate potenti aptent integer posuere eleifend lobortis pellentesque vivamus sociis tempus, dignissim congue vestibulum purus laoreet interdum venenatis diam turpis habitasse nam. Natoque elementum blandit duis montes proin netus tincidunt tortor, parturient fermentum sed dui mattis quis placerat conubia eu, vivamus sed litora a est suscipit pulvinar. Sem imperdiet hendrerit leo aliquet sodales natoque sollicitudin, tempor ante gravida enim facilisis donec, feugiat quisque nostra hac platea pharetra. Rutrum eros massa ornare congue euismod nam ac, morbi fringilla lobortis egestas mi tincidunt fames, quam class ligula inceptos convallis magna. Eu sociis placerat elementum aenean, felis nunc id.";

export type RemainingContentType = {
  page: number;
  text: string;
};

export default function OutgoingLetterPrintPreview({
  forwardedRef,
}: OutgoingLetterPrintPreviewProps) {
  const letterDetails = useAppSelector(selectLetterDetails);
  const [remainingContent, setRemainingContent] = useState<
    Array<RemainingContentType>
  >([]);
  const [filteredContent, setFilteredContent] = useState<
    Array<RemainingContentType>
  >([]);

  useEffect(() => {
    const filtered = remainingContent.reduce(
      (acc: RemainingContentType[], curr) => {
        if (!acc.some((item) => item.page === curr.page)) {
          acc.push(curr);
        }
        return acc;
      },
      []
    );

    setFilteredContent(filtered);
  }, [remainingContent]);

  function addWordsToElement(
    text: string,
    element: HTMLDivElement,
    page: number
  ) {
    const words = text.split(/\s+/);
    let overflowDetected = false;
    let remainingWords: string[] = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      element.innerHTML += word + " ";

      if (element.scrollHeight > element.clientHeight) {
        overflowDetected = true;
        remainingWords = words.slice(i);
        break;
      }
    }

    if (overflowDetected) {
      if (remainingWords.length > 0) {
        const newContent: RemainingContentType = {
          page: page,
          text: remainingWords.join(" "),
        };

        setRemainingContent((prevContent) => [...prevContent, newContent]);
      }
    } else {
      console.log("All words added successfully without overflow.");
    }
  }

  return (
    <div ref={forwardedRef} className="flex flex-col items-center py-5 gap-10">
      <CoverPage
        // text={letterDetails?.content ? letterDetails?.content : ""}
        text={SAMPLE_CONTENT}
        addWordsToElement={addWordsToElement}
      />
      {filteredContent.map((content, index) => (
        <SubsequentPage
          key={content.page + 1}
          id={index}
          text={content.text}
          addWordsToElement={addWordsToElement}
        />
      ))}
    </div>
  );
}
