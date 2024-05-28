import Link from "next/link";
import React from "react";
import Image from "next/image";
import ButtonNavigation from "../_components/ui/button/ButtonNavigation";
import ButtonCreateForm from "../_components/ui/button/ButtonCreateForm";
import {
	AtSign,
	Bot,
	Calendar,
	CodeXml,
	Command,
	CreditCard,
	EyeOff,
	FileInput,
	FilePenLine,
	Forward,
	GitBranch,
	LayoutPanelLeft,
	Lock,
	MailCheck,
	MessageSquareDashed,
	Palette,
	Sigma,
	TextCursorInput,
	Trophy,
	Upload,
	Image as Img,
	Tv2,
	RedoDot,
	Languages,
	PictureInPicture2,
	Link2,
	ExternalLink,
	Globe,
} from "lucide-react";
import BlockQuote from "../_components/ui/BlockQuote";
import FeatureInfoV1 from "../_components/ui/FeatureInfoV1";
import Grid6x6, { GridIconText } from "../_components/ui/Grid6x6";
import ImageAndText from "../_components/ui/ImageAndText";
import IconTextLink from "../_components/ui/IconTextLink";
import Grid3x3 from "../_components/ui/Grid3x3";
import Header from "../_components/Header";
import DivNative from "../_components/ui/NativeHtml/DivNative";
import ParagraphNative from "../_components/ui/NativeHtml/ParagraphNative";
import SpanNative from "../_components/ui/NativeHtml/SpanNative";

const brandImages = [
	"/assets/images/HomePage/notion.png",
	"/assets/images/HomePage/make.png",
	"/assets/images/HomePage/buy-me-a-coffee.png",
	"/assets/images/HomePage/rakuten.png",
	"/assets/images/HomePage/glovo.png",
];

const InputImages = [
	"/assets/images/HomePage/SliderInputs/inputs-1.png",
	"/assets/images/HomePage/SliderInputs/inputs-2.png",
	"/assets/images/HomePage/SliderInputs/inputs-3.png",
	"/assets/images/HomePage/SliderInputs/inputs-4.png",
	"/assets/images/HomePage/SliderInputs/inputs-5.png",
	"/assets/images/HomePage/SliderInputs/inputs-6.png",
	"/assets/images/HomePage/SliderInputs/inputs-7.png",
	"/assets/images/HomePage/SliderInputs/inputs-8.png",
	"/assets/images/HomePage/SliderInputs/inputs-9.png",
];

const CustomizeImages = [
	"/assets/images/HomePage/SliderCustomize/customization-1.png",
	"/assets/images/HomePage/SliderCustomize/customization-2.png",
	"/assets/images/HomePage/SliderCustomize/customization-3.png",
	"/assets/images/HomePage/SliderCustomize/customization-4.png",
	"/assets/images/HomePage/SliderCustomize/customization-5.png",
];

const GRID_ONE: GridIconText[] = [
	{
		icon: <AtSign className="text-pinkCustom" />,
		title: "Contact info",
		content: "Collect names, addresses, phone numbers, emails & links.",
	},
	{
		icon: <CreditCard className="text-pinkCustom" />,
		title: "Accept payments",
		content: "Create checkout forms without code",
	},

	{
		icon: <FilePenLine className="text-pinkCustom" />,
		title: "Signatures",
		content: "Accept e-signatures and streamline contract signing",
	},

	{
		icon: <Trophy className="text-pinkCustom" />,
		title: "Rate & rank",
		content: "Let users share their opinions using visually simple ratings, scales, and rankings",
	},

	{
		icon: <Upload className="text-pinkCustom" />,
		title: "File uploads",
		content: "Collect images, PDFs, video and audio files",
	},

	{
		icon: <Calendar className="text-pinkCustom" />,
		title: "Date & Time",
		content: "Allow respondents easily select date and time",
	},
];

const GRID_TWO: GridIconText[] = [
	{
		icon: <AtSign className="text-pinkCustom" />,
		title: "Answer piping",
		content: "Mention answers from earlier questions to personalize your form",
	},
	{
		icon: <MailCheck className="text-pinkCustom" />,
		title: "Email notifications",
		content: "Send tailored emails to yourself and respondents",
	},

	{
		icon: <Forward className="text-pinkCustom" />,
		title: "Redirect on completion",
		content: "Forward respondents to another web page",
	},

	{
		icon: <FileInput className="text-pinkCustom" />,
		title: "Pre-populate fields",
		content: "Save time by pre-filling form fields with data you already have about respondents.",
	},

	{
		icon: <Bot className="text-pinkCustom" />,
		title: "reCAPTCHA",
		content: " Protect your forms from spam and bots",
	},

	{
		icon: <MessageSquareDashed className="text-pinkCustom" />,
		title: "Partial submissions",
		content: "Capture unfinished form submissions",
	},
];

const GRID_THREE: GridIconText[] = [
	{
		icon: <LayoutPanelLeft className="text-pinkCustom" />,
		title: "Column layout",
		content: "Display content side-by-side using columns",
	},
	{
		icon: <CodeXml className="text-pinkCustom" />,
		title: "Custom Css",
		content: "Inject custom CSS to fully control your form design",
	},

	{
		icon: <Img className="text-pinkCustom" />,
		title: "Images",
		content: "Add a logo, cover image and embed visuals",
	},

	{
		icon: <Tv2 className="text-pinkCustom" />,
		title: "Embed online content",
		content: "Embed YouTube, Calendly, Maps, and more",
	},

	{
		icon: <RedoDot className="text-pinkCustom" />,
		title: "Multi-page forms",
		content: "Create a single-page or multi-page form",
	},

	{
		icon: <Languages className="text-pinkCustom" />,
		title: "40+ supported languages",
		content: "Translate the default form messages for respondents worldwide",
	},
];

const GRID_FOUR: GridIconText[] = [
	{
		icon: <Image src={"/assets/images/HomePage/IconBrand/icon_NOTION.png"} width={30} height={30} alt="brand" />,
		title: "Notion",
		content: "Send submissions to Notion.",
	},

	{
		icon: (
			<Image
				src={"/assets/images/HomePage/IconBrand/icon_GOOGLE_SHEETS.png"}
				width={30}
				height={30}
				alt="brand"
			/>
		),
		title: "Google Sheets",
		content: "Send submissions to a sheet.",
	},

	{
		icon: <Image src={"/assets/images/HomePage/IconBrand/icon_AIRTABLE.png"} width={30} height={30} alt="brand" />,
		title: "Airtable",
		content: "Send submissions to Airtable.",
	},

	{
		icon: <Image src={"/assets/images/HomePage/IconBrand/icon_WEBHOOKS.png"} width={30} height={30} alt="brand" />,
		title: "WebHooks",
		content: "Send events for new submissions to HTTP endpoints..",
	},

	{
		icon: <Image src={"/assets/images/HomePage/IconBrand/icon_SLACK.png"} width={30} height={30} alt="brand" />,
		title: "Slack",
		content: "Send Slack messages for new submissions",
	},

	{
		icon: <Image src={"/assets/images/HomePage/IconBrand/icon_CODA.png"} width={30} height={30} alt="brand" />,
		title: "Coda",
		content: "Send submissions to Coda.",
	},

	{
		icon: (
			<Image
				src={"/assets/images/HomePage/IconBrand/icon_GOOGLE_ANALYTICS.png"}
				width={30}
				height={30}
				alt="brand"
			/>
		),
		title: "Google Analytics.",
		content: "Analyze traffic sources, visitor behavior and time spent.",
	},

	{
		icon: (
			<Image
				src={"/assets/images/HomePage/IconBrand/icon_FACEBOOK_PIXEL.png"}
				width={30}
				height={30}
				alt="brand"
			/>
		),
		title: "Meta Pixel.",
		content: "Measure and optimize your ad campaigns",
	},

	{
		icon: <Image src={"/assets/images/HomePage/IconBrand/icon_ZAPIER.png"} width={30} height={30} alt="brand" />,
		title: "Zapier",
		content: "Send submissions to your favorite tools",
	},

	{
		icon: (
			<Image src={"/assets/images/HomePage/IconBrand/icon_INTEGROMAT.png"} width={30} height={30} alt="brand" />
		),
		title: "Make",
		content: "Send submissions to your favorite tools",
	},

	{
		icon: <Image src={"/assets/images/HomePage/IconBrand/icon_PIPEDREAM.png"} width={30} height={30} alt="brand" />,
		title: "Pipedream",
		content: "Send submissions to your favorite tools.",
	},
];

const HomePage = () => {
	return (
		<DivNative className="flex  w-full min-w-full max-w-full ">
			<DivNative className="flex w-full flex-col h-max   ">
				<DivNative className="flex flex-col ">
					<Header />

					<DivNative className=" relative   sm:mt-[160px] mt-[128px]  min-h-screen h-max mb-[380px] sm:mb-[180px] xl:mb-[240px] ">
						<DivNative
							className="absolute hidden xl:block top-[230px] left-0 w-[350px] h-full "
							style={{
								backgroundImage: "url('/assets/images/HomePage/faces-left.png')",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
							}}
						></DivNative>

						<DivNative
							className="absolute hidden xl:block top-[230px] right-0 w-[500px] h-full  "
							style={{
								backgroundImage: "url('/assets/images/HomePage/faces-right.png')",
								backgroundRepeat: "no-repeat",
								backgroundSize: "contain",
								backgroundPositionX: "right",
							}}
						></DivNative>

						<DivNative
							className="mt-[20px]  absolute block xl:hidden top-[-120px] left-[50%] translate-x-[-50%] w-[80%] sm:w-[50%] h-[120px] overflow-hidden"
							style={{
								backgroundImage: "url('/assets/images/HomePage/faces-mobile.png')",
								backgroundRepeat: "no-repeat",
								backgroundSize: "contain",
							}}
						></DivNative>
						<DivNative className="absolute mt-[20px] top-0 left-[50%] translate-x-[-50%] w-full xl:w-[1024px] h-max flex flex-col justify-center items-center gap-[32px] ">
							<h1 className="relative text-[20px] xl:text-[60px] font-bold text-center">
								Dự án tạo form thu thập thông tin như Google Form
								<Image
									src={"/assets/images/HomePage/title-highlight-2.png"}
									width={181}
									height={12}
									className="hidden xl:inline absolute left-[150px] bottom-0 w-[181px] xl:h-[12px]"
									alt="highlight-text"
								/>
							</h1>
							<ParagraphNative
								className="w-full xl:w-[50%] text-[13px] xl:text-[20px] text-justify sm:text-center break-words"
								textContent="
								Project dựa trên ý tưởng về giao diện của tally.so, dự án vẫn đang trong quá trình xây dựng"
							/>

							<Link
								href={"/login"}
								// urlNavigation="create-form"
								// textContent="Tạo một form miễn phí"
								className="!mt-[10px] !xl:mt-[50px] p-[6px_12px] flex  justify-center items-center gap-[.8rem] text-[1.8rem] text-[#ffffff] bg-[rgb(0_112_215)] opacity-[.95] hover:opacity-100 transition-colors duration-200 rounded-[.6rem]"
							>
								Tạo form miễn phí
							</Link>

							<video playsInline autoPlay muted loop className="w-full  border-shadow-normal">
								<source src="/assets/videos/homePage/intro.mp4" />
							</video>

							<DivNative className="mt-[40px] w-[80%] flex items-center flex-col gap-[60px] ">
								<SpanNative
									className="text-[1.8rem] text-textMain  font-medium"
									textContent="Powering 200,000+ teams at the world’s best companies"
								/>

								<DivNative className="w-full min-h-max flex flex-wrap xl:flex-nowrap gap-[24px] xl:gap-[16px] items-center justify-between">
									{brandImages.map((img) => (
										<Image
											key={img}
											width={104}
											height={40}
											src={img}
											alt="brand"
											className="w-[42%] sm:w-[20%] xl:w-[104px]  xl:h-[40px]"
										/>
									))}
								</DivNative>

								<Link href={"/register"}>
									<Image
										src={"/assets/images/HomePage/golden-kitty-badge.svg"}
										width={250}
										height={54}
										alt="..."
										className="w-[250px] h-[54px]"
									/>
								</Link>
							</DivNative>
						</DivNative>
					</DivNative>
					<main className="w-full xl:w-[1024px]  sm:mt-[70px] xl:mt-[370px] flex flex-col gap-[80px] mx-auto h-max">
						<DivNative className="flex flex-col gap-[24px] ">
							<h2 className="text-h2 ">A form builder like no other</h2>
							<ParagraphNative
								className="text-[2rem] w-full xl:w-[60%] break-words text-textMain text-justify"
								textContent="Tally makes it simple for anyone to build free online forms. No need to code — just type
								your questions like you would in a doc."
							/>

							<DivNative className="relative w-full min-h-[360px] h-max rounded-xl shadow-shadowPink ">
								<DivNative className="p-[24px] flex flex-col gap-[18px]">
									<h3 className="text-[rgb(248_28_229)] text-h3">
										Unlimited forms and submissions for free
									</h3>
									<ParagraphNative
										className="text-[1.2rem] xl:text-[1.8rem] text-slate-500 text-justify"
										textContent="Paywalls getting in the way of great forms? Here at Tally, we provide unlimited
										forms, submissions, and everything you need to create professional forms and
										surveys — all free of charge as long as you stay within our"
									>
										<SpanNative
											className="underline text-textMain"
											textContent="fair usage guidelines."
										/>
									</ParagraphNative>
								</DivNative>
								<Image
									width={1160}
									height={279}
									alt="bg"
									src={"/assets/images/HomePage/dive-in.png"}
									className="absolute bottom-0 left-0 w-full h-[140px] xl:h-[200px]"
								/>
							</DivNative>
						</DivNative>

						<DivNative className=" flex flex-col xl:flex-row gap-[40px]">
							<DivNative className="border-shadow-normal w-full xl:w-[60%] h-[365px] xl:h-[510px]  flex flex-col gap-[10px] overflow-hidden">
								<DivNative className="p-[16px] xl:p-[30px] flex flex-col gap-[20px]">
									<Command className="text-pinkCustom" />
									<h4 className="text-h4 font-semibold">Just start typing</h4>
									<ParagraphNative
										className="text-[1.4rem] xl:text-[1.6rem]"
										textContent="Tally is a new type of online form builder that works like a text document. Just
										start typing on the page and insert blocks same as Notion."
									/>
								</DivNative>
								<video playsInline autoPlay muted loop className="flex-1 w-full">
									<source src="/assets/videos/homePage/just-type-card.mp4" className="w-full" />
								</video>
							</DivNative>
							<DivNative className="border-shadow-normal w-full xl:w-[40%] h-[365px] xl:h-[510px]  flex flex-col gap-[10px] overflow-hidden">
								<DivNative className="p-[16px] xl:p-[30px] flex flex-col gap-[20px]">
									<Lock className="text-pinkCustom" />
									<h4 className="text-h4 font-semibold">Privacy-friendly form builder</h4>
									<ParagraphNative
										className="text-[1.4rem] xl:text-[1.6rem] "
										textContent="Your data privacy and security are our top priorities. We are"
									>
										<SpanNative className="text-highlight" textContent="GDPR compliant" />
										<SpanNative textContent="and treat your data with care and confidentiality." />
									</ParagraphNative>
									<p className="text-[1.4rem] xl:text-[1.6rem]">
										Tally is <span className="text-highlight"> hosted in Europe</span>, we don’t use
										cookie-tracking, and all form data is securely stored, and{" "}
										<span className="text-highlight">encrypted</span>
										both in transit and at rest.{" "}
										<span className="underline text-textMain">Learn more about Tally & GDPR.</span>
									</p>
								</DivNative>
								<Image
									width={380}
									height={240}
									src={"/assets/images/HomePage/encryption.png"}
									alt="description"
								/>
							</DivNative>
						</DivNative>
						<BlockQuote
							BlockquoteContent="“Loving Tally! Not sure why I only started using it now, so good!”"
							ImagePath="/assets/images/HomePage/quote-ben.jpg"
							Author="Ben Lang"
							Description="Angel investor, previously at Notion"
						/>

						<DivNative className="h-max">
							<FeatureInfoV1
								BeforeTextHighlight="Simple"
								TextHighlight="but"
								AfterTextHighlight="powerful"
								ImageHighlight="/assets/images/HomePage/title-highlight-1.png"
								ImageRight="/assets/images/HomePage/click-plus.png"
								TextSub="Advanced features packed in a simple form builder. It couldn’t be easier to
										create forms that convert."
								DescriptionIcon={<TextCursorInput className="text-pinkCustom" />}
								DescriptionText="Build any form in seconds"
								DescriptionTextSub="Easily create online forms using our wide range of free input blocks. Collect
										contact info, files, signatures, payments, and much more. Build everything from
										surveys to quizzes to lead generation forms."
								Mode={{
									mode: "SLIDER",
									ImagePathArray: InputImages,
									DescriptionBgImg: "/assets/images/HomePage/input-badges.png",
								}}
								Postion={{ mode: "BOTTOM" }}
							/>
						</DivNative>
						<DivNative className="w-full  mt-[40px]">
							<Grid6x6 ElementGrid={GRID_ONE} />
						</DivNative>

						<DivNative className="h-max">
							<FeatureInfoV1
								BeforeTextHighlight="Craft"
								TextHighlight="intelligent"
								AfterTextHighlight="forms"
								ImageHighlight="/assets/images/HomePage/title-highlight-2.png"
								ImageRight="/assets/images/HomePage/smart.png"
								TextSub="Our smart features make it easy to turn your forms into a tailored experience for every respondent

"
								DescriptionIcon={<GitBranch className="text-pinkCustom" />}
								DescriptionText="Conditional logic"
								DescriptionTextSub="Build dynamic forms that adapt based on prior inputs or external data. Show and hide blocks, insert branching, or calculate values to create a personalized form experience"
								Mode={{
									mode: "IMAGE",
									ImagePath: "/assets/images/HomePage/smart-3.png",
								}}
								Postion={{ mode: "BOTTOM" }}
							/>
						</DivNative>

						<DivNative className="flex flex-col xl:flex-row gap-[40px]  h-max">
							<DivNative className="w-full xl:w-[50%] min-h-full">
								<FeatureInfoV1
									HiddenTextArea={true}
									DescriptionIcon={<Sigma className="text-pinkCustom" />}
									DescriptionText="Conditional logic"
									DescriptionTextSub="Build dynamic forms that adapt based on prior inputs or external data. Show and hide blocks, insert branching, or calculate values to create a personalized form experience"
									Mode={{
										mode: "IMAGE",
										ImagePath: "/assets/images/HomePage/smart-2.png",
									}}
									Postion={{ mode: "BOTTOM" }}
								/>
							</DivNative>
							<DivNative className="w-full xl:w-[50%] min-h-full">
								<FeatureInfoV1
									HiddenTextArea={true}
									DescriptionIcon={<EyeOff className="text-pinkCustom" />}
									DescriptionText="Hidden fields"
									DescriptionTextSub="Pass data to your form with URL parameters. Include UTM parameters or personal data for a customized experience."
									Mode={{
										mode: "IMAGE",
										ImagePath: "/assets/images/HomePage/smart-2.png",
									}}
									Postion={{ mode: "BOTTOM" }}
								/>
							</DivNative>
						</DivNative>

						<DivNative className="w-full  mt-[40px]">
							<Grid6x6 ElementGrid={GRID_TWO} />
						</DivNative>
						<BlockQuote
							BlockquoteContent="“Tally is doing to forms what Notion did to docs & sheets.”"
							ImagePath="/assets/images/HomePage/quote-nathan.png"
							Author="Natan Castiel"
							Description="Head of Growth, Gelt"
						/>

						<DivNative className="h-max">
							<FeatureInfoV1
								BeforeTextHighlight="Make forms uniquely"
								TextHighlight="yours"
								AfterTextHighlight=""
								ImageHighlight="/assets/images/HomePage/title-highlight-3.png"
								ImageRight="/assets/images/HomePage/customize.png"
								TextSub="Easily customize the design and layout to fit any form to your brand."
								DescriptionIcon={<Palette className="text-pinkCustom" />}
								DescriptionText="Customize your form"
								DescriptionTextSub="Use our pre-made themes or create your own design by customizing colors, fonts, buttons, and more"
								Mode={{
									mode: "SLIDER",
									ImagePathArray: CustomizeImages,
								}}
								Postion={{ mode: "BOTTOM" }}
							/>
						</DivNative>
						<DivNative className="w-full  mt-[40px]">
							<Grid6x6 ElementGrid={GRID_THREE} />
						</DivNative>

						<DivNative className="flex flex-col gap-[20px] h-max">
							<ImageAndText
								BeforeTextHighlight=""
								TextHighlight="Share"
								AfterTextHighlight="with your audience"
								ImageHighlight="/assets/images/HomePage/title-highlight-4.png"
								TextSub="Tailor how you share and display forms to connect with your audience across platforms."
								ImageRight="/assets/images/HomePage/paper-plane.png"
								Position={{ mode: "WRAPPER" }}
							/>
							<DivNative className="flex  flex-col xl:flex-row gap-[20px] h-max ">
								<DivNative className="w-full xl:w-[60%] min-h-max xl:min-h-full ">
									<FeatureInfoV1
										HiddenTextArea={true}
										DescriptionIcon={<LayoutPanelLeft className="text-pinkCustom" />}
										DescriptionText="Embed"
										DescriptionTextSub={
											"Seamlessly embed your forms into your website, landing page, or Notion. Whether you use WordPress, Webflow, Framer, or any other website builder, integrating Tally forms into your web pages is simple."
										}
										Mode={{
											mode: "IMAGE",
											ImagePath: "/assets/images/HomePage/smart-2.png",
										}}
										Postion={{ mode: "BOTTOM" }}
									/>
								</DivNative>
								<DivNative className="w-full xl:w-[40%] flex flex-col  gap-[20px]">
									<IconTextLink
										Icon={<PictureInPicture2 className="text-pinkCustom" />}
										Title="Popup"
										TextSub="Create an eye-catching popup form for your website in seconds."
										LinkColorBg="bg-blue-600"
										LinkTextColor="text-[#ffffff]"
										TextLink="Click Me"
									/>

									<IconTextLink
										Icon={<Link2 className="text-pinkCustom" />}
										Title="Tally links"
										TextSub={"Share your unique Tally form link with anyone."}
										LinkColorBg="bg-slate-200"
										LinkTextColor="text-slate-700 font-medium"
										TextLink="tally.so/r/3qDpEY"
										LinkIcon={<ExternalLink />}
									/>

									<IconTextLink
										Icon={<Globe className="text-pinkCustom" />}
										Title="Custom domains"
										TextSub="Host forms on your own (sub)domain to create branded form links."
										LinkColorBg="bg-slate-200"
										LinkTextColor="text-slate-700 font-medium"
										TextLink="forms.yourdomain.com/feedback"
									/>
								</DivNative>
							</DivNative>
						</DivNative>

						<DivNative className="flex flex-col gap-[80px]">
							<ImageAndText
								BeforeTextHighlight=""
								TextHighlight="Connect"
								AfterTextHighlight="your favorite tools"
								ImageHighlight="/assets/images/HomePage/title-highlight-3.png"
								TextSub="Save time using popular integrations to sync your form submissions.."
								ImageRight="/assets/images/HomePage/strategy.png"
								Position={{ mode: "BOTTOM" }}
							/>

							<DivNative className="">
								<Grid3x3 ElementGrid={GRID_FOUR} />
							</DivNative>
						</DivNative>

						<BlockQuote
							BlockquoteContent="“Can attest that Tally >>> Typeform hands down”
"
							Author="Steven Tey"
							Description="Founder Dub.co, previously at Vercel
"
							ImagePath="/assets/images/HomePage/quote-steven.jpg"
						/>

						<DivNative className="flex items-center flex-col gap-[10px]">
							<Image
								src={"/assets/images/HomePage/roll-up-sleeves.png"}
								width={500}
								height={370}
								alt="brand"
							/>

							<h3 className="text-h2 !text-[3.6rem] mt-[40px] text-center">
								Build stunning forms for free
							</h3>
							<p className="mb-[60px] text-[2.2rem] w-full xl:w-[50%] text-center ">
								It’s as simple as one-two-three, and guess what? You don’t even need an account to try
								it out!
							</p>

							<ButtonCreateForm textContent="Create a free form" urlNavigation="/" />
						</DivNative>

						<BlockQuote
							BlockquoteContent="“Absolutely adore Tally! A game-changer - incredibly powerful, yet ridiculously user-friendly. It enabled me to effortlessly gather inputs, add forms with ease, and even pre-fill them. And the icing on the cake - absolutely free to use!”"
							Author="Shyam Verma"
							Description="Digital creator"
							ImagePath="/assets/images/HomePage/quote-shyam.png"
						/>
					</main>
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default HomePage;
