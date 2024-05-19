--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categorized_chatbots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorized_chatbots (
    categorized_chatbot_id bigint NOT NULL,
    chatbot_title character varying(255),
    chatbot_uuid character varying(255),
    folder_id bigint
);


ALTER TABLE public.categorized_chatbots OWNER TO postgres;

--
-- Name: categorized_chatbots_categorized_chatbot_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorized_chatbots_categorized_chatbot_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorized_chatbots_categorized_chatbot_id_seq OWNER TO postgres;

--
-- Name: categorized_chatbots_categorized_chatbot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorized_chatbots_categorized_chatbot_id_seq OWNED BY public.categorized_chatbots.categorized_chatbot_id;


--
-- Name: folders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.folders (
    folder_id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    ms_uuid character varying(255),
    folder_name character varying(255)
);


ALTER TABLE public.folders OWNER TO postgres;

--
-- Name: folders_folder_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.folders_folder_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.folders_folder_id_seq OWNER TO postgres;

--
-- Name: folders_folder_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.folders_folder_id_seq OWNED BY public.folders.folder_id;


--
-- Name: ms_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ms_users (
    ms_pk bigint NOT NULL,
    microsoft_id character varying(255),
    ms_uuid character varying(255),
    user_name character varying(255)
);


ALTER TABLE public.ms_users OWNER TO postgres;

--
-- Name: ms_users_ms_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ms_users_ms_pk_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ms_users_ms_pk_seq OWNER TO postgres;

--
-- Name: ms_users_ms_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ms_users_ms_pk_seq OWNED BY public.ms_users.ms_pk;


--
-- Name: nicknames; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nicknames (
    nickname character varying(255) NOT NULL,
    is_assigned boolean
);


ALTER TABLE public.nicknames OWNER TO postgres;

--
-- Name: user_device; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_device (
    user_id bigint NOT NULL,
    device_token character varying(255)
);


ALTER TABLE public.user_device OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    user_dept character varying(255),
    user_nickname character varying(255),
    user_role character varying(255),
    ms_uuid character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: categorized_chatbots categorized_chatbot_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorized_chatbots ALTER COLUMN categorized_chatbot_id SET DEFAULT nextval('public.categorized_chatbots_categorized_chatbot_id_seq'::regclass);


--
-- Name: folders folder_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.folders ALTER COLUMN folder_id SET DEFAULT nextval('public.folders_folder_id_seq'::regclass);


--
-- Name: ms_users ms_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ms_users ALTER COLUMN ms_pk SET DEFAULT nextval('public.ms_users_ms_pk_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: categorized_chatbots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorized_chatbots (categorized_chatbot_id, chatbot_title, chatbot_uuid, folder_id) FROM stdin;
14	채팅	67fed2bf-3319-4580-9353-face2e962057	8
22	ㄴㅇㅁㅁㅇㄴㅇㅁㅇㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ	c3c4e597-d4d2-40dc-be6d-bc44674103b4	11
24	기타저장	31fc8441-be20-444b-bd33-fa1a5bd642ce	5
31	새폴더이잉ㅁ	8e5f642e-7ab5-4196-8c1d-31fdbc4bf53e	7
37	야호	9ffe7edd-5213-4007-927c-a8c1f762b407	31
38	설정!	8891d025-7b8d-4c7d-baa9-575827162ae2	32
39	외부인과 화상회의 하는 법 	716d2105-2b5d-4314-a6e0-c2de9b2fc3eb	31
\.


--
-- Data for Name: folders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.folders (folder_id, created_at, updated_at, ms_uuid, folder_name) FROM stdin;
5	2024-05-16 20:57:13	2024-05-16 20:57:14	7d323c20-6121-472c-aece-6291f66739da	내폴더
7	2024-05-17 07:56:50.929008	2024-05-17 07:56:50.929008	9afbc606-e750-4a3b-8bce-d589142c4a90	히히
8	2024-05-17 09:01:04.92392	2024-05-17 09:01:04.92392	17e5ece2-422e-4699-b76b-1e7d87415eaf	채팅
10	2024-05-17 10:13:46.627076	2024-05-17 10:13:46.627076	2e022d75-5309-4535-917a-5f9328d656d9	ㄴㅇㄹㄴㅇㄹ
11	2024-05-17 10:39:45.927013	2024-05-17 10:39:45.927013	5be74b86-6d30-4369-80b1-3fd80f828096	ㅁㄴㅇㅁㅇ
12	2024-05-17 12:14:27.915606	2024-05-17 12:14:27.915606	2b86660e-3457-4930-b17a-46e7d952d711	조직 외부
13	2024-05-17 12:50:53.649135	2024-05-17 12:50:53.649135	5be74b86-6d30-4369-80b1-3fd80f828096	ㅁㄴㅇㅁㄴㅇㅇㅁㄴㅇㄴㅁ
14	2024-05-17 12:52:48.601289	2024-05-17 12:52:48.601289	5be74b86-6d30-4369-80b1-3fd80f828096	폴더222222222222222222222
15	2024-05-17 12:55:14.729078	2024-05-17 12:55:14.729078	5be74b86-6d30-4369-80b1-3fd80f828096	ㅇㅇ
16	2024-05-17 12:55:22.837873	2024-05-17 12:55:22.837873	5be74b86-6d30-4369-80b1-3fd80f828096	ㅇㅇ
17	2024-05-17 12:55:25.210493	2024-05-17 12:55:25.210493	5be74b86-6d30-4369-80b1-3fd80f828096	ㅇㅇ
18	2024-05-17 12:56:23.88214	2024-05-17 12:56:23.88214	2e022d75-5309-4535-917a-5f9328d656d9	너너너
30	2024-05-17 15:44:09.563212	2024-05-17 15:44:09.563212	17e5ece2-422e-4699-b76b-1e7d87415eaf	으앙
31	2024-05-17 15:45:04.091322	2024-05-17 15:45:04.091322	17e5ece2-422e-4699-b76b-1e7d87415eaf	야호
32	2024-05-19 07:29:49.611478	2024-05-19 07:29:49.611478	f1c2505e-3844-4984-ad16-495370d272ea	회의
\.


--
-- Data for Name: ms_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ms_users (ms_pk, microsoft_id, ms_uuid, user_name) FROM stdin;
7	waterleee6@SSAFY204.onmicrosoft.com	661434ac-a022-4b8e-b51b-a001a9854ccf	LeeSumin
8	RohSungeun@SSAFY504.onmicrosoft.com	f1c2505e-3844-4984-ad16-495370d272ea	RohSungeun
10	ssafyirony52@gmail.com	17e5ece2-422e-4699-b76b-1e7d87415eaf	[서울_6반_S204]팀장 연정흠
13	fwccjs@gmail.com	2b86660e-3457-4930-b17a-46e7d952d711	[서울_6반_S204]팀원 손준성
34	s204_psy@s204ssafy.onmicrosoft.com	3426cbd9-d595-4fb6-8f85-998a35eff1ac	박소영
37	waterleee6@gmail.com	2e022d75-5309-4535-917a-5f9328d656d9	. 이수민[서울_6반_S204]팀원
39	qhdrnak@SSAFY301.onmicrosoft.com	5be74b86-6d30-4369-80b1-3fd80f828096	김봉균
\.


--
-- Data for Name: nicknames; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nicknames (nickname, is_assigned) FROM stdin;
어두운 물수리	f
신비로운 물수리	f
평범한 삑삑이	f
가난한 수리	f
빛나는 왜가리	f
호화로운 솔개	f
무서운 카나리아	f
조용한 카나리아	f
밝은 메추라기	f
급한 참새	f
어두운 앵무새	f
이상한 앵무새	f
이상한 매	f
까다로운 진돗개	f
곱슬곱슬한 백로	f
작은 수리부엉이	f
조용한 메추라기	f
지친 매	f
조용한 키위	f
강렬한 수리	f
곱슬곱슬한 갈매기	f
무서운 타조	f
깜찍한 펭귄	f
빛나는 수리부엉이	f
날카로운 뻐꾸기	f
빠른 종다리	f
용감한 수리	f
커다란 스커	f
곱슬곱슬한 카나리아	f
용감한 뻐꾸기	f
까다로운 메추라기	f
즐거운 비둘기	f
차가운 바다제비	f
강렬한 쇠백로	f
지친 앵무새	f
깜찍한 진돗개	f
즐거운 바다제비	f
신선한 오리	f
신선한 뻐꾸기	f
흐린 큰부리새	f
차가운 제비	f
가난한 물수리	f
평범한 물닭	f
흐린 왜가리	f
매력적인 종다리	f
작은 키위	f
평범한 바다오리	f
어두운 솔개	f
빛나는 바다제비	f
무서운 물닭	f
날카로운 황새	f
밝은 스커	f
호기심 많은 키위	f
가난한 큰부리새	f
용감한 오리	f
조용한 유리새	f
강렬한 왜가리	f
조용한 은빛	f
부드러운 황새	f
기묘한 홍학	f
신선한 참새	f
곱슬곱슬한 스커	f
강렬한 카나리아	f
조용한 바다오리	f
부드러운 제비	f
커다란 뻐꾸기	f
이상한 은빛	f
커다란 왜가리	f
활기찬 물수리	f
평범한 매	f
차가운 갈매기	f
작은 유리새	f
거친 카나리아	f
비범한 참새	f
빠른 앵무새	f
흐린 물수리	f
강렬한 스커	f
빠른 까마귀	f
곱슬곱슬한 느시	f
매력적인 플라밍고	f
이상한 메추라기	f
느린 타조	f
날카로운 수리	f
영리한 뻐꾸기	f
밝은 거위	f
급한 앵무새	f
지친 진돗개	f
반짝이는 쇠제비	f
부지런한 솔개	f
평범한 대백로	f
부드러운 새매	f
따뜻한 플라밍고	f
어두운 오리	f
이상한 백로	f
활기찬 바다오리	f
기묘한 참새	f
커다란 매	f
호기심 많은 큰부리새	f
가난한 삑삑이	f
어두운 스커	f
밝은 키위	f
신비로운 갈매기	f
이상한 수리부엉이	f
무서운 물수리	f
신비로운 독수리	f
지친 모래뒤쥐	f
강렬한 솔개	f
용감한 진돗개	f
부드러운 펭귄	f
날카로운 고니	f
무서운 제비	f
밝은 제비	f
깜찍한 독수리	f
빠른 참새	f
활기찬 황새	f
호화로운 갈매기	f
부지런한 종다리	f
느린 펭귄	f
부지런한 제비	f
교활한 펭귄	f
차가운 모래뒤쥐	f
지친 홍학	f
용감한 갈매기	f
강렬한 느시	f
부드러운 왜가리	f
거친 매	f
따뜻한 카나리아	f
호화로운 물수리	f
신선한 메추라기	f
부드러운 홍학	f
느린 매	f
비범한 느시	f
부드러운 스커	f
신선한 제비	f
활기찬 검독수리	f
신선한 느시	f
커다란 비둘기	f
지친 바다제비	f
작은 스커	f
곱슬곱슬한 삑삑이	f
조용한 갈매기	f
느린 수리	f
교활한 까마귀	f
까다로운 스커	f
밝은 왜가리	f
까다로운 참새	f
용감한 매	f
호화로운 독수리	f
거친 거위	t
부드러운 물닭	t
곱슬곱슬한 고니	t
빛나는 앵무새	t
평범한 큰부리새	t
흐린 비둘기	t
용감한 메추라기	t
빛나는 은빛	t
작은 진돗개	t
용감한 제비	f
영리한 검독수리	f
매력적인 쇠제비	f
느린 새매	f
부드러운 콘도르	f
부지런한 모래뒤쥐	f
날카로운 종다리	f
호화로운 스커	f
곱슬곱슬한 종다리	f
활기찬 오리	f
밝은 까마귀	f
이상한 쇠제비	f
딱딱한 수리부엉이	f
깜찍한 황새	f
깜찍한 매	f
영리한 솔개	f
호기심 많은 앵무새	f
커다란 키위	f
강렬한 고니	f
빠른 물수리	f
풍부한 홍학	f
빠른 쇠제비	f
활기찬 왜가리	f
차가운 새매	f
부드러운 검독수리	f
풍부한 키위	f
호기심 많은 오리	f
즐거운 거위	f
매끈한 쇠백로	f
평범한 바다제비	f
부지런한 펭귄	f
풍부한 솔개	f
신선한 앵무새	f
시끄러운 꿩	f
시끄러운 쇠백로	f
조용한 매	f
곱슬곱슬한 홍학	f
용감한 참새	f
반짝이는 백로	f
용감한 물수리	f
비범한 솔개	f
부지런한 키위	f
차가운 오리	f
영리한 까마귀	f
급한 카나리아	f
날카로운 키위	f
평범한 은빛	f
시끄러운 뻐꾸기	f
활기찬 삑삑이	f
호기심 많은 물닭	f
즐거운 콘도르	f
용감한 대백로	f
거친 검독수리	f
날카로운 거위	f
가난한 유리새	f
신선한 대백로	f
흐린 오리	f
급한 수리부엉이	f
평범한 갈매기	f
따뜻한 타조	f
흐린 플라밍고	f
커다란 제비	f
신선한 황새	f
지친 콘도르	f
용감한 유리새	f
비범한 홍학	f
신선한 바다제비	f
매끈한 독수리	f
반짝이는 황새	f
매력적인 은빛	f
시끄러운 거위	f
차가운 수리부엉이	f
빛나는 바다오리	f
시끄러운 물수리	f
거친 펭귄	f
급한 홍학	f
딱딱한 오리	f
딱딱한 검독수리	f
곱슬곱슬한 메추라기	f
활기찬 대백로	f
가난한 쇠백로	f
밝은 홍학	f
따뜻한 진돗개	f
커다란 은빛	f
조용한 비둘기	f
무서운 바다제비	f
용감한 모래뒤쥐	f
흐린 쇠제비	f
시끄러운 메추라기	f
빠른 유리새	f
급한 펭귄	f
교활한 물수리	f
빠른 수리	f
신비로운 꿩	f
조용한 종다리	f
급한 타조	f
부지런한 매	f
부드러운 유리새	f
영리한 거위	f
작은 대백로	f
작은 뻐꾸기	f
빛나는 수리	f
가난한 은빛	f
빠른 거위	f
부드러운 까마귀	f
깜찍한 바다제비	f
따뜻한 앵무새	f
딱딱한 콘도르	f
느린 제비	f
매력적인 메추라기	f
어두운 거위	f
커다란 꿩	f
날카로운 쇠백로	f
느린 삑삑이	f
까다로운 종다리	f
시끄러운 스커	f
느린 까마귀	f
호화로운 대백로	f
매끈한 꿩	f
지친 쇠제비	f
호화로운 펭귄	f
평범한 타조	f
어두운 홍학	f
신선한 홍학	f
거친 물닭	f
작은 메추라기	f
용감한 은빛	f
용감한 카나리아	f
부드러운 거위	f
부드러운 꿩	f
부드러운 삑삑이	f
날카로운 진돗개	f
용감한 종다리	f
반짝이는 수리	f
반짝이는 검독수리	f
까다로운 콘도르	f
깜찍한 물닭	f
평범한 수리부엉이	f
거친 까마귀	f
빠른 모래뒤쥐	f
부지런한 갈매기	f
딱딱한 까마귀	f
조용한 꿩	f
비범한 플라밍고	f
평범한 뻐꾸기	f
빛나는 참새	f
활기찬 바다제비	f
밝은 쇠백로	t
기묘한 솔개	t
기묘한 까마귀	t
신선한 비둘기	t
따뜻한 느시	t
반짝이는 매	t
까다로운 삑삑이	t
부지런한 물수리	t
지친 삑삑이	f
매끈한 홍학	f
호기심 많은 쇠제비	f
이상한 펭귄	f
딱딱한 독수리	f
풍부한 물닭	f
강렬한 대백로	f
빛나는 메추라기	f
평범한 왜가리	f
용감한 물닭	f
용감한 꿩	f
용감한 솔개	f
깜찍한 쇠제비	f
어두운 은빛	f
활기찬 진돗개	f
작은 쇠백로	f
까다로운 거위	f
호화로운 삑삑이	f
따뜻한 유리새	f
급한 메추라기	f
강렬한 꿩	f
호기심 많은 고니	f
시끄러운 검독수리	f
곱슬곱슬한 쇠백로	f
날카로운 참새	f
밝은 플라밍고	f
풍부한 왜가리	f
매끈한 은빛	f
매끈한 거위	f
딱딱한 쇠제비	f
호화로운 키위	f
신비로운 메추라기	f
평범한 검독수리	f
시끄러운 비둘기	f
커다란 쇠백로	f
매력적인 진돗개	f
강렬한 키위	f
영리한 키위	f
깜찍한 쇠백로	f
어두운 느시	f
활기찬 큰부리새	f
즐거운 유리새	f
곱슬곱슬한 검독수리	f
어두운 까마귀	f
조용한 황새	f
강렬한 참새	f
조용한 고니	f
부지런한 백로	f
교활한 카나리아	f
평범한 카나리아	f
부드러운 비둘기	f
반짝이는 타조	f
어두운 쇠제비	f
영리한 쇠백로	f
무서운 갈매기	f
용감한 왜가리	f
무서운 수리	f
활기찬 메추라기	f
이상한 비둘기	f
빛나는 고니	f
조용한 뻐꾸기	f
가난한 검독수리	f
작은 큰부리새	f
까다로운 황새	f
교활한 유리새	f
비범한 매	f
영리한 펭귄	f
매력적인 콘도르	f
딱딱한 유리새	f
영리한 콘도르	f
즐거운 쇠백로	f
호기심 많은 수리	f
비범한 타조	f
흐린 종다리	f
차가운 솔개	f
딱딱한 백로	f
용감한 비둘기	f
활기찬 수리부엉이	f
부지런한 수리	f
차가운 스커	f
비범한 콘도르	f
영리한 플라밍고	f
평범한 솔개	f
활기찬 카나리아	f
교활한 모래뒤쥐	f
깜찍한 은빛	f
빛나는 까마귀	f
풍부한 꿩	f
작은 검독수리	f
이상한 진돗개	f
느린 콘도르	f
급한 은빛	f
이상한 독수리	f
빠른 매	f
느린 검독수리	f
즐거운 까마귀	f
급한 느시	f
신비로운 대백로	f
곱슬곱슬한 콘도르	f
이상한 유리새	f
빛나는 쇠제비	f
호화로운 진돗개	f
기묘한 갈매기	f
무서운 큰부리새	f
반짝이는 대백로	f
매력적인 비둘기	f
가난한 뻐꾸기	f
매끈한 고니	f
밝은 진돗개	f
빛나는 쇠백로	f
비범한 갈매기	f
기묘한 메추라기	f
조용한 진돗개	f
풍부한 삑삑이	f
신선한 바다오리	f
무서운 모래뒤쥐	f
무서운 거위	f
까다로운 대백로	f
교활한 꿩	f
기묘한 삑삑이	f
차가운 콘도르	f
작은 종다리	f
강렬한 플라밍고	f
깜찍한 백로	f
신비로운 느시	f
조용한 수리	f
밝은 꿩	f
급한 수리	f
즐거운 모래뒤쥐	f
급한 왜가리	f
호화로운 고니	f
부지런한 수리부엉이	f
교활한 오리	f
시끄러운 참새	f
활기찬 고니	f
신비로운 제비	f
깜찍한 까마귀	f
평범한 종다리	f
매끈한 비둘기	f
커다란 바다오리	f
작은 참새	f
비범한 쇠백로	f
급한 키위	f
반짝이는 솔개	f
가난한 카나리아	f
기묘한 백로	f
깜찍한 유리새	f
영리한 물닭	f
매끈한 모래뒤쥐	f
곱슬곱슬한 펭귄	f
따뜻한 물수리	f
매끈한 키위	t
조용한 바다제비	t
매력적인 매	t
용감한 황새	t
빠른 꿩	f
용감한 스커	f
신선한 왜가리	f
커다란 백로	f
까다로운 왜가리	f
부드러운 대백로	f
딱딱한 앵무새	f
용감한 백로	f
용감한 삑삑이	f
흐린 물닭	f
거친 홍학	f
딱딱한 참새	f
활기찬 까마귀	f
활기찬 솔개	f
까다로운 펭귄	f
작은 펭귄	f
호기심 많은 왜가리	f
따뜻한 왜가리	f
딱딱한 삑삑이	f
조용한 대백로	f
강렬한 백로	f
이상한 종다리	f
용감한 앵무새	f
따뜻한 키위	f
영리한 고니	f
풍부한 모래뒤쥐	f
어두운 유리새	f
신비로운 종다리	f
풍부한 앵무새	f
딱딱한 메추라기	f
빛나는 모래뒤쥐	f
딱딱한 대백로	f
호화로운 콘도르	f
빛나는 꿩	f
따뜻한 종다리	f
날카로운 유리새	f
신비로운 쇠백로	f
호화로운 제비	f
흐린 쇠백로	f
가난한 물닭	f
즐거운 바다오리	f
따뜻한 스커	f
차가운 매	f
이상한 오리	f
조용한 펭귄	f
평범한 스커	f
거친 비둘기	f
기묘한 물수리	f
호기심 많은 물수리	f
커다란 바다제비	f
반짝이는 왜가리	f
교활한 참새	f
따뜻한 새매	f
기묘한 종다리	f
느린 오리	f
까다로운 앵무새	f
활기찬 은빛	f
거친 제비	f
어두운 메추라기	f
매력적인 홍학	f
빛나는 삑삑이	f
이상한 키위	f
느린 뻐꾸기	f
매력적인 수리	f
커다란 물수리	f
기묘한 유리새	f
매끈한 뻐꾸기	f
어두운 새매	f
어두운 모래뒤쥐	f
용감한 까마귀	f
호기심 많은 검독수리	f
밝은 쇠제비	f
거친 키위	f
매끈한 유리새	f
교활한 바다오리	f
커다란 큰부리새	f
곱슬곱슬한 플라밍고	f
시끄러운 매	f
영리한 꿩	f
빛나는 카나리아	f
밝은 카나리아	f
밝은 참새	f
가난한 바다제비	f
흐린 고니	f
매력적인 고니	f
호화로운 메추라기	f
빠른 대백로	f
신선한 매	f
무서운 쇠백로	f
밝은 수리부엉이	f
거친 백로	f
느린 백로	f
빠른 홍학	f
호화로운 황새	f
기묘한 황새	f
날카로운 바다오리	f
빛나는 홍학	f
까다로운 수리	f
평범한 까마귀	f
무서운 바다오리	f
날카로운 플라밍고	f
호화로운 홍학	f
차가운 쇠제비	f
부드러운 솔개	f
딱딱한 은빛	f
지친 카나리아	f
가난한 솔개	f
평범한 새매	f
호기심 많은 새매	f
기묘한 쇠백로	f
부드러운 바다제비	f
부지런한 타조	f
조용한 모래뒤쥐	f
조용한 쇠제비	f
급한 독수리	f
밝은 유리새	f
흐린 대백로	f
어두운 진돗개	f
부드러운 물수리	f
반짝이는 홍학	f
작은 거위	f
강렬한 비둘기	f
지친 비둘기	f
작은 콘도르	f
따뜻한 비둘기	f
즐거운 타조	f
지친 수리	f
활기찬 뻐꾸기	f
조용한 콘도르	f
빛나는 거위	f
지친 검독수리	f
즐거운 솔개	f
급한 플라밍고	f
깜찍한 타조	f
매력적인 바다제비	f
영리한 은빛	f
조용한 오리	f
용감한 플라밍고	f
영리한 종다리	f
기묘한 거위	f
느린 쇠백로	f
평범한 꿩	f
조용한 플라밍고	f
반짝이는 물수리	f
평범한 물수리	f
느린 바다제비	f
부지런한 고니	f
이상한 콘도르	f
작은 왜가리	f
따뜻한 백로	f
매력적인 까마귀	f
부지런한 큰부리새	f
딱딱한 물닭	f
빛나는 키위	f
교활한 키위	t
흐린 황새	t
깜찍한 갈매기	t
커다란 앵무새	f
밝은 새매	f
부드러운 모래뒤쥐	f
따뜻한 참새	f
흐린 펭귄	f
날카로운 삑삑이	f
영리한 새매	f
거친 메추라기	f
무서운 새매	f
날카로운 오리	f
딱딱한 진돗개	f
거친 뻐꾸기	f
풍부한 갈매기	f
부드러운 오리	f
따뜻한 까마귀	f
작은 쇠제비	f
깜찍한 삑삑이	f
매끈한 백로	f
밝은 바다오리	f
즐거운 오리	f
어두운 물닭	f
교활한 비둘기	f
신선한 스커	f
호기심 많은 은빛	f
매력적인 타조	f
작은 바다제비	f
매력적인 스커	f
흐린 거위	f
이상한 느시	f
빠른 메추라기	f
거친 진돗개	f
급한 스커	f
호기심 많은 타조	f
풍부한 펭귄	f
반짝이는 키위	f
부드러운 메추라기	f
커다란 수리	f
가난한 오리	f
신비로운 쇠제비	f
거친 스커	f
깜찍한 검독수리	f
지친 새매	f
따뜻한 갈매기	f
시끄러운 고니	f
용감한 바다오리	f
반짝이는 갈매기	f
지친 유리새	f
이상한 카나리아	f
반짝이는 수리부엉이	f
부드러운 수리	f
까다로운 매	f
밝은 황새	f
매끈한 바다제비	f
비범한 스커	f
까다로운 솔개	f
딱딱한 타조	f
호기심 많은 메추라기	f
조용한 타조	f
비범한 대백로	f
강렬한 진돗개	f
강렬한 삑삑이	f
까다로운 꿩	f
즐거운 수리부엉이	f
급한 오리	f
빠른 느시	f
빠른 검독수리	f
영리한 바다제비	f
가난한 키위	f
즐거운 카나리아	f
조용한 독수리	f
신비로운 진돗개	f
무서운 꿩	f
비범한 모래뒤쥐	f
기묘한 수리부엉이	f
밝은 백로	f
흐린 콘도르	f
호기심 많은 스커	f
기묘한 쇠제비	f
부드러운 진돗개	f
따뜻한 매	f
호기심 많은 거위	f
평범한 홍학	f
까다로운 수리부엉이	f
매력적인 거위	f
호기심 많은 황새	f
매끈한 검독수리	f
커다란 종다리	f
활기찬 새매	f
기묘한 수리	f
차가운 비둘기	f
호화로운 검독수리	f
무서운 콘도르	f
부드러운 바다오리	f
부드러운 쇠제비	f
급한 고니	f
빛나는 백로	f
호기심 많은 매	f
신선한 플라밍고	f
용감한 큰부리새	f
매끈한 메추라기	f
부드러운 고니	f
비범한 물수리	f
신비로운 매	f
호화로운 왜가리	f
커다란 삑삑이	f
활기찬 플라밍고	f
느린 황새	f
신비로운 비둘기	f
반짝이는 뻐꾸기	f
강렬한 타조	f
비범한 비둘기	f
용감한 새매	f
신선한 거위	f
비범한 오리	f
가난한 수리부엉이	f
매력적인 키위	f
풍부한 진돗개	f
조용한 까마귀	f
빠른 물닭	f
즐거운 큰부리새	f
곱슬곱슬한 참새	f
비범한 뻐꾸기	f
흐린 수리부엉이	f
시끄러운 독수리	f
매력적인 오리	f
곱슬곱슬한 타조	f
차가운 삑삑이	f
거친 왜가리	f
기묘한 매	f
평범한 앵무새	f
교활한 메추라기	f
부지런한 꿩	f
이상한 왜가리	f
급한 꿩	f
까다로운 느시	f
곱슬곱슬한 은빛	f
즐거운 검독수리	f
조용한 솔개	f
흐린 은빛	f
가난한 백로	f
날카로운 모래뒤쥐	f
까다로운 큰부리새	f
딱딱한 바다오리	f
거친 유리새	f
호기심 많은 느시	f
날카로운 새매	f
커다란 콘도르	f
따뜻한 거위	f
작은 느시	f
부드러운 백로	f
시끄러운 왜가리	f
호기심 많은 삑삑이	f
영리한 삑삑이	f
반짝이는 플라밍고	f
매력적인 바다오리	f
시끄러운 느시	f
매력적인 갈매기	f
무서운 대백로	f
흐린 느시	f
커다란 모래뒤쥐	f
기묘한 플라밍고	f
강렬한 황새	f
딱딱한 모래뒤쥐	f
빠른 황새	f
교활한 거위	f
비범한 물닭	f
급한 모래뒤쥐	f
급한 황새	f
어두운 종다리	f
딱딱한 솔개	f
부지런한 거위	f
활기찬 매	f
느린 큰부리새	f
활기찬 제비	f
지친 타조	f
차가운 플라밍고	f
즐거운 앵무새	f
이상한 삑삑이	f
어두운 쇠백로	f
빠른 비둘기	f
느린 대백로	f
평범한 참새	f
신선한 검독수리	f
느린 모래뒤쥐	f
따뜻한 콘도르	f
곱슬곱슬한 물닭	f
빠른 은빛	f
따뜻한 은빛	f
커다란 플라밍고	f
신선한 진돗개	f
가난한 거위	f
차가운 바다오리	f
딱딱한 키위	f
날카로운 홍학	f
차가운 쇠백로	f
따뜻한 메추라기	f
부지런한 오리	f
어두운 비둘기	f
느린 키위	f
시끄러운 콘도르	f
용감한 키위	f
까다로운 제비	f
지친 참새	f
빛나는 물수리	f
교활한 고니	f
거친 은빛	f
이상한 수리	f
거친 바다오리	f
딱딱한 뻐꾸기	f
풍부한 느시	f
매력적인 삑삑이	f
풍부한 거위	f
반짝이는 고니	f
깜찍한 대백로	f
빠른 오리	f
거친 큰부리새	f
매끈한 황새	f
평범한 키위	f
이상한 갈매기	f
날카로운 검독수리	f
느린 유리새	f
작은 물수리	f
작은 타조	f
곱슬곱슬한 독수리	f
평범한 독수리	f
딱딱한 황새	f
흐린 바다제비	f
딱딱한 거위	f
빛나는 대백로	f
빠른 쇠백로	f
밝은 고니	f
지친 쇠백로	f
용감한 바다제비	f
가난한 까마귀	f
용감한 콘도르	f
느린 홍학	f
영리한 수리	f
빠른 뻐꾸기	f
용감한 독수리	f
딱딱한 물수리	f
신선한 수리부엉이	f
느린 물닭	f
신비로운 솔개	f
강렬한 갈매기	f
기묘한 느시	f
급한 제비	f
활기찬 종다리	f
곱슬곱슬한 새매	f
매력적인 카나리아	f
기묘한 키위	f
활기찬 물닭	f
비범한 까마귀	f
신선한 유리새	f
곱슬곱슬한 까마귀	f
신선한 꿩	f
깜찍한 참새	f
교활한 물닭	f
커다란 독수리	f
깜찍한 꿩	f
매력적인 꿩	f
밝은 은빛	f
활기찬 유리새	f
부지런한 검독수리	f
작은 은빛	f
가난한 고니	f
강렬한 앵무새	f
커다란 오리	f
어두운 고니	f
빠른 스커	f
차가운 키위	f
부지런한 비둘기	f
지친 플라밍고	f
빛나는 제비	f
부드러운 독수리	f
느린 진돗개	f
시끄러운 수리	f
신선한 까마귀	f
날카로운 비둘기	f
신선한 쇠백로	f
거친 삑삑이	f
비범한 바다오리	f
거친 타조	f
차가운 앵무새	f
조용한 물닭	f
빛나는 플라밍고	f
영리한 수리부엉이	f
까다로운 뻐꾸기	f
매끈한 스커	f
까다로운 물수리	f
급한 유리새	f
조용한 앵무새	f
이상한 큰부리새	f
가난한 매	f
시끄러운 제비	f
느린 수리부엉이	f
조용한 큰부리새	f
영리한 갈매기	f
신비로운 타조	f
신선한 큰부리새	f
시끄러운 갈매기	f
따뜻한 모래뒤쥐	f
거친 갈매기	f
신선한 쇠제비	f
용감한 펭귄	f
부드러운 수리부엉이	f
매끈한 대백로	f
부지런한 카나리아	f
가난한 황새	f
날카로운 앵무새	f
흐린 타조	f
부드러운 앵무새	f
커다란 대백로	f
커다란 황새	t
교활한 매	f
빠른 수리부엉이	f
무서운 펭귄	f
빛나는 새매	f
영리한 모래뒤쥐	f
부지런한 대백로	f
매끈한 진돗개	f
평범한 펭귄	f
용감한 느시	f
거친 바다제비	f
매력적인 쇠백로	f
곱슬곱슬한 바다제비	f
신선한 물수리	f
차가운 물닭	f
부드러운 키위	f
시끄러운 진돗개	f
기묘한 대백로	f
영리한 스커	f
영리한 비둘기	f
교활한 느시	f
커다란 참새	f
호기심 많은 모래뒤쥐	f
시끄러운 삑삑이	f
차가운 참새	f
이상한 타조	f
매끈한 솔개	f
교활한 앵무새	f
활기찬 스커	f
호기심 많은 종다리	f
기묘한 물닭	f
용감한 쇠제비	f
매력적인 독수리	f
풍부한 물수리	f
신비로운 앵무새	f
신선한 물닭	f
비범한 수리부엉이	f
차가운 종다리	f
곱슬곱슬한 대백로	f
활기찬 비둘기	f
급한 바다오리	f
신선한 펭귄	f
영리한 앵무새	f
곱슬곱슬한 비둘기	f
비범한 메추라기	f
깜찍한 느시	f
부지런한 유리새	f
강렬한 큰부리새	f
어두운 검독수리	f
교활한 수리부엉이	f
풍부한 쇠제비	f
교활한 타조	f
부지런한 쇠백로	f
밝은 앵무새	f
까다로운 갈매기	f
시끄러운 대백로	f
무서운 뻐꾸기	f
매끈한 큰부리새	f
기묘한 오리	f
가난한 왜가리	f
깜찍한 비둘기	f
무서운 느시	f
흐린 스커	f
흐린 갈매기	f
빠른 플라밍고	f
깜찍한 거위	f
즐거운 물닭	f
풍부한 수리	f
조용한 참새	f
날카로운 제비	f
시끄러운 물닭	f
곱슬곱슬한 뻐꾸기	f
풍부한 검독수리	f
무서운 앵무새	f
호기심 많은 쇠백로	f
부드러운 느시	f
밝은 독수리	f
까다로운 검독수리	f
호화로운 참새	f
즐거운 황새	f
이상한 황새	f
시끄러운 모래뒤쥐	f
딱딱한 홍학	f
날카로운 갈매기	f
빛나는 스커	f
용감한 타조	f
지친 꿩	f
즐거운 키위	f
무서운 오리	f
교활한 갈매기	f
급한 진돗개	f
부드러운 쇠백로	f
반짝이는 독수리	f
즐거운 삑삑이	f
느린 갈매기	f
호화로운 타조	f
딱딱한 느시	f
호화로운 플라밍고	f
비범한 쇠제비	f
매끈한 참새	f
평범한 플라밍고	f
커다란 유리새	f
부지런한 바다제비	f
흐린 솔개	f
비범한 은빛	f
느린 은빛	f
비범한 고니	f
시끄러운 바다오리	f
커다란 홍학	f
반짝이는 펭귄	f
신비로운 고니	f
활기찬 거위	f
곱슬곱슬한 오리	f
곱슬곱슬한 큰부리새	f
어두운 갈매기	f
조용한 왜가리	f
커다란 고니	f
평범한 쇠제비	f
매력적인 뻐꾸기	f
빛나는 타조	f
영리한 큰부리새	f
어두운 바다오리	f
호화로운 카나리아	f
까다로운 물닭	f
커다란 진돗개	f
곱슬곱슬한 키위	f
영리한 왜가리	f
호화로운 수리	f
작은 수리	f
작은 고니	f
까다로운 쇠백로	f
즐거운 제비	f
신선한 콘도르	f
부지런한 느시	f
매력적인 모래뒤쥐	f
느린 참새	f
커다란 갈매기	f
매끈한 콘도르	f
매력적인 황새	f
즐거운 매	f
신비로운 수리	f
교활한 콘도르	f
느린 왜가리	f
반짝이는 새매	f
밝은 뻐꾸기	f
용감한 쇠백로	f
조용한 백로	f
부드러운 참새	f
영리한 타조	f
반짝이는 바다오리	f
강렬한 검독수리	f
교활한 수리	f
가난한 모래뒤쥐	f
곱슬곱슬한 모래뒤쥐	f
영리한 홍학	t
날카로운 쇠제비	f
풍부한 메추라기	f
즐거운 새매	f
거친 솔개	f
밝은 펭귄	f
가난한 진돗개	f
차가운 수리	f
곱슬곱슬한 제비	f
강렬한 까마귀	f
빛나는 황새	f
매력적인 왜가리	f
조용한 거위	f
풍부한 타조	f
풍부한 까마귀	f
교활한 스커	f
어두운 왜가리	f
교활한 바다제비	f
거친 종다리	f
가난한 타조	f
교활한 독수리	f
기묘한 콘도르	f
이상한 스커	f
용감한 거위	f
까다로운 유리새	f
평범한 수리	f
따뜻한 오리	f
곱슬곱슬한 수리	f
평범한 모래뒤쥐	f
깜찍한 모래뒤쥐	f
영리한 카나리아	f
날카로운 큰부리새	f
지친 오리	f
신비로운 황새	f
빠른 바다오리	f
곱슬곱슬한 거위	f
매력적인 새매	f
풍부한 스커	f
활기찬 꿩	f
기묘한 진돗개	f
부드러운 큰부리새	f
차가운 홍학	f
신비로운 키위	f
호화로운 바다오리	f
시끄러운 오리	f
거친 오리	f
따뜻한 수리부엉이	f
지친 솔개	f
기묘한 검독수리	f
즐거운 스커	f
날카로운 꿩	f
거친 앵무새	f
흐린 독수리	f
지친 왜가리	f
교활한 뻐꾸기	f
영리한 유리새	f
매끈한 펭귄	f
흐린 까마귀	f
영리한 메추라기	f
용감한 수리부엉이	f
느린 앵무새	f
커다란 카나리아	f
작은 비둘기	f
기묘한 펭귄	f
기묘한 앵무새	f
매끈한 수리	f
급한 삑삑이	f
차가운 유리새	f
까다로운 키위	f
부지런한 메추라기	f
호화로운 꿩	f
가난한 플라밍고	f
빠른 바다제비	f
딱딱한 고니	f
비범한 수리	f
시끄러운 큰부리새	f
가난한 비둘기	f
매끈한 카나리아	f
밝은 콘도르	f
느린 독수리	f
평범한 진돗개	f
비범한 꿩	f
부지런한 스커	f
즐거운 갈매기	f
신비로운 큰부리새	f
용감한 홍학	f
시끄러운 카나리아	f
어두운 꿩	f
작은 홍학	f
호화로운 큰부리새	f
가난한 독수리	f
지친 큰부리새	f
어두운 매	f
조용한 느시	f
급한 새매	f
흐린 진돗개	f
작은 백로	f
작은 삑삑이	f
따뜻한 쇠백로	f
비범한 제비	f
밝은 삑삑이	f
작은 플라밍고	f
부지런한 독수리	f
날카로운 까마귀	f
즐거운 느시	f
어두운 타조	f
따뜻한 고니	f
신비로운 참새	f
부드러운 갈매기	f
가난한 갈매기	f
강렬한 독수리	f
흐린 뻐꾸기	f
이상한 고니	f
활기찬 갈매기	f
신비로운 왜가리	f
반짝이는 유리새	f
신비로운 까마귀	f
비범한 진돗개	f
반짝이는 쇠백로	f
가난한 앵무새	f
거친 새매	f
호화로운 오리	f
평범한 유리새	f
비범한 황새	f
차가운 카나리아	f
강렬한 은빛	f
이상한 바다오리	f
까다로운 카나리아	f
교활한 백로	f
시끄러운 솔개	f
부드러운 카나리아	f
날카로운 메추라기	f
매끈한 물수리	f
부지런한 왜가리	f
밝은 매	f
곱슬곱슬한 유리새	f
지친 물수리	f
풍부한 큰부리새	f
가난한 쇠제비	f
반짝이는 물닭	f
반짝이는 제비	f
작은 제비	f
시끄러운 유리새	f
이상한 대백로	f
호화로운 거위	f
매끈한 플라밍고	f
즐거운 뻐꾸기	f
빛나는 큰부리새	f
호기심 많은 플라밍고	f
차가운 뻐꾸기	f
날카로운 바다제비	f
어두운 참새	f
즐거운 꿩	f
신선한 백로	t
호화로운 종다리	t
평범한 콘도르	t
급한 비둘기	f
무서운 은빛	f
빛나는 비둘기	f
지친 느시	f
지친 거위	f
깜찍한 고니	f
매력적인 물수리	f
부지런한 삑삑이	f
이상한 새매	f
부지런한 콘도르	f
신비로운 홍학	f
차가운 고니	f
날카로운 독수리	f
부지런한 바다오리	f
깜찍한 수리	f
영리한 매	f
급한 종다리	f
급한 물닭	f
흐린 카나리아	f
흐린 홍학	f
차가운 꿩	f
깜찍한 바다오리	f
차가운 큰부리새	f
깜찍한 오리	f
무서운 왜가리	f
반짝이는 거위	f
차가운 펭귄	f
이상한 모래뒤쥐	f
가난한 제비	f
조용한 스커	f
즐거운 종다리	f
따뜻한 물닭	f
강렬한 메추라기	f
급한 거위	f
매끈한 오리	f
부지런한 앵무새	f
무서운 비둘기	f
활기찬 참새	f
밝은 비둘기	f
부드러운 플라밍고	f
활기찬 홍학	f
활기찬 쇠백로	f
풍부한 고니	f
강렬한 물닭	f
지친 대백로	f
이상한 쇠백로	f
차가운 느시	f
깜찍한 카나리아	f
딱딱한 매	f
깜찍한 물수리	f
호화로운 백로	f
딱딱한 카나리아	f
작은 매	f
영리한 물수리	f
거친 느시	f
반짝이는 큰부리새	f
빠른 큰부리새	f
즐거운 홍학	f
급한 콘도르	f
호기심 많은 카나리아	f
작은 바다오리	f
느린 느시	f
풍부한 백로	f
매력적인 제비	f
비범한 왜가리	f
부드러운 뻐꾸기	f
거친 쇠제비	f
활기찬 느시	f
따뜻한 큰부리새	f
호기심 많은 갈매기	f
호기심 많은 펭귄	f
빛나는 솔개	f
즐거운 메추라기	f
빛나는 매	f
시끄러운 타조	f
호기심 많은 콘도르	f
비범한 백로	f
매끈한 앵무새	f
빠른 진돗개	f
반짝이는 콘도르	f
기묘한 비둘기	f
비범한 펭귄	f
깜찍한 뻐꾸기	f
빛나는 오리	f
지친 백로	f
시끄러운 수리부엉이	f
부드러운 매	f
느린 카나리아	f
느린 메추라기	f
반짝이는 바다제비	f
까다로운 은빛	f
커다란 검독수리	f
까다로운 독수리	f
날카로운 타조	f
가난한 콘도르	f
비범한 유리새	f
빠른 갈매기	f
무서운 진돗개	f
신비로운 콘도르	f
신선한 새매	f
조용한 홍학	f
까다로운 홍학	f
커다란 물닭	f
조용한 물수리	f
신비로운 뻐꾸기	f
시끄러운 플라밍고	f
지친 메추라기	f
영리한 바다오리	f
매력적인 펭귄	f
흐린 키위	f
호기심 많은 솔개	f
신비로운 스커	f
평범한 백로	f
교활한 대백로	f
깜찍한 키위	f
따뜻한 독수리	f
이상한 검독수리	f
호기심 많은 바다오리	f
느린 고니	f
딱딱한 쇠백로	f
무서운 황새	f
매력적인 참새	f
즐거운 수리	f
교활한 쇠제비	f
용감한 검독수리	f
부지런한 참새	f
호화로운 앵무새	f
무서운 까마귀	f
차가운 검독수리	f
강렬한 펭귄	f
작은 새매	f
반짝이는 스커	f
기묘한 바다제비	f
영리한 대백로	f
평범한 오리	f
지친 황새	f
기묘한 새매	f
곱슬곱슬한 솔개	f
매끈한 물닭	f
까다로운 바다제비	f
신선한 모래뒤쥐	f
급한 백로	f
곱슬곱슬한 꿩	f
즐거운 왜가리	f
지친 까마귀	f
신선한 타조	f
곱슬곱슬한 왜가리	f
딱딱한 비둘기	f
빛나는 종다리	f
거친 콘도르	f
교활한 은빛	f
까다로운 바다오리	f
시끄러운 펭귄	f
평범한 메추라기	f
작은 솔개	f
풍부한 바다제비	f
조용한 제비	f
가난한 펭귄	f
무서운 수리부엉이	f
밝은 종다리	f
작은 꿩	f
빠른 솔개	f
부드러운 은빛	f
거친 고니	f
지친 스커	f
교활한 쇠백로	f
평범한 황새	f
날카로운 대백로	f
강렬한 바다제비	f
빠른 삑삑이	f
깜찍한 종다리	f
어두운 뻐꾸기	f
커다란 새매	f
급한 쇠제비	f
즐거운 독수리	f
호화로운 쇠백로	f
매력적인 검독수리	f
느린 물수리	f
무서운 솔개	f
가난한 바다오리	f
곱슬곱슬한 쇠제비	f
작은 황새	f
지친 물닭	f
반짝이는 메추라기	f
따뜻한 검독수리	f
가난한 홍학	f
급한 검독수리	f
호기심 많은 제비	f
신비로운 바다오리	f
거친 쇠백로	f
밝은 물수리	f
어두운 황새	f
빠른 왜가리	f
무서운 스커	f
빠른 독수리	f
가난한 느시	f
즐거운 은빛	f
차가운 타조	f
무서운 백로	f
신선한 삑삑이	f
기묘한 왜가리	f
신선한 은빛	f
어두운 카나리아	f
빛나는 진돗개	f
시끄러운 앵무새	f
평범한 느시	f
매끈한 쇠제비	f
지친 뻐꾸기	f
신비로운 은빛	f
흐린 유리새	f
호화로운 매	f
신선한 종다리	f
부지런한 은빛	f
흐린 백로	f
가난한 메추라기	f
거친 수리	f
풍부한 콘도르	f
지친 펭귄	f
호기심 많은 참새	f
호화로운 새매	f
어두운 독수리	f
차가운 진돗개	f
활기찬 독수리	f
기묘한 은빛	f
활기찬 모래뒤쥐	f
비범한 종다리	f
무서운 매	f
무서운 삑삑이	f
풍부한 플라밍고	f
가난한 꿩	f
커다란 까마귀	f
지친 바다오리	f
빠른 새매	f
교활한 홍학	f
이상한 꿩	f
시끄러운 바다제비	f
흐린 삑삑이	f
이상한 물닭	f
이상한 참새	f
흐린 수리	f
지친 갈매기	f
작은 까마귀	f
날카로운 수리부엉이	f
반짝이는 참새	f
영리한 쇠제비	f
지친 고니	f
시끄러운 새매	f
흐린 꿩	f
풍부한 참새	f
커다란 솔개	f
빠른 타조	f
딱딱한 스커	f
빠른 펭귄	f
날카로운 콘도르	f
깜찍한 콘도르	f
거친 독수리	f
호화로운 모래뒤쥐	f
비범한 키위	f
매끈한 새매	f
매력적인 유리새	f
거친 꿩	f
느린 꿩	f
비범한 삑삑이	f
어두운 큰부리새	f
용감한 고니	f
신비로운 바다제비	f
빠른 카나리아	f
신선한 갈매기	f
날카로운 매	f
시끄러운 홍학	f
매력적인 앵무새	f
호기심 많은 바다제비	f
매끈한 타조	f
풍부한 새매	f
매끈한 바다오리	f
신비로운 새매	f
비범한 거위	f
조용한 삑삑이	f
시끄러운 까마귀	f
부지런한 플라밍고	f
즐거운 참새	f
어두운 키위	f
부지런한 홍학	f
어두운 수리	f
무서운 참새	f
영리한 황새	f
어두운 백로	f
매끈한 종다리	f
강렬한 새매	f
매끈한 수리부엉이	f
딱딱한 갈매기	f
부지런한 뻐꾸기	f
무서운 플라밍고	f
흐린 메추라기	f
풍부한 대백로	f
곱슬곱슬한 황새	f
어두운 바다제비	f
강렬한 거위	f
호기심 많은 홍학	f
날카로운 펭귄	f
기묘한 모래뒤쥐	f
교활한 제비	f
기묘한 타조	f
신비로운 오리	f
강렬한 유리새	f
지친 독수리	f
강렬한 모래뒤쥐	f
딱딱한 수리	f
날카로운 물수리	f
차가운 물수리	t
무서운 검독수리	t
무서운 쇠제비	t
비범한 독수리	f
빠른 키위	f
커다란 수리부엉이	f
급한 대백로	f
거친 수리부엉이	f
반짝이는 앵무새	f
어두운 플라밍고	f
풍부한 독수리	f
비범한 큰부리새	f
반짝이는 진돗개	f
강렬한 오리	f
풍부한 쇠백로	f
깜찍한 스커	f
따뜻한 펭귄	f
작은 카나리아	f
신비로운 카나리아	f
평범한 비둘기	f
호화로운 비둘기	f
풍부한 황새	f
어두운 수리부엉이	f
교활한 플라밍고	f
빠른 백로	f
작은 모래뒤쥐	f
이상한 바다제비	f
무서운 종다리	f
기묘한 큰부리새	f
호기심 많은 뻐꾸기	f
거친 황새	f
거친 모래뒤쥐	f
빛나는 느시	f
어두운 펭귄	f
강렬한 매	f
이상한 홍학	f
작은 독수리	f
거친 물수리	f
반짝이는 까마귀	f
느린 쇠제비	f
지친 종다리	f
느린 바다오리	f
조용한 수리부엉이	f
따뜻한 뻐꾸기	f
급한 솔개	f
강렬한 홍학	f
강렬한 수리부엉이	f
활기찬 쇠제비	f
호화로운 수리부엉이	f
풍부한 매	f
날카로운 솔개	f
느린 플라밍고	f
따뜻한 황새	f
곱슬곱슬한 앵무새	f
곱슬곱슬한 진돗개	f
가난한 종다리	f
매끈한 왜가리	f
평범한 고니	f
비범한 카나리아	f
매력적인 백로	f
호기심 많은 독수리	f
부지런한 쇠제비	f
밝은 갈매기	f
이상한 물수리	f
매끈한 갈매기	f
곱슬곱슬한 물수리	f
따뜻한 꿩	f
어두운 제비	f
즐거운 백로	f
즐거운 플라밍고	f
차가운 은빛	f
깜찍한 플라밍고	f
영리한 오리	f
딱딱한 종다리	f
조용한 검독수리	f
호화로운 은빛	f
신비로운 플라밍고	f
호기심 많은 꿩	f
호기심 많은 유리새	f
딱딱한 제비	f
빛나는 물닭	f
호기심 많은 대백로	f
빛나는 뻐꾸기	f
흐린 모래뒤쥐	f
시끄러운 쇠제비	f
느린 종다리	f
밝은 큰부리새	f
거친 참새	f
기묘한 뻐꾸기	f
반짝이는 느시	f
따뜻한 솔개	f
시끄러운 황새	f
따뜻한 제비	f
기묘한 스커	f
호화로운 물닭	f
급한 물수리	f
풍부한 바다오리	f
기묘한 카나리아	f
기묘한 고니	f
따뜻한 수리	f
조용한 쇠백로	f
빛나는 펭귄	f
밝은 모래뒤쥐	f
흐린 검독수리	f
활기찬 펭귄	f
밝은 대백로	f
풍부한 유리새	f
교활한 삑삑이	f
평범한 쇠백로	f
작은 오리	f
차가운 대백로	f
무서운 독수리	f
곱슬곱슬한 바다오리	f
강렬한 종다리	f
즐거운 쇠제비	f
까다로운 모래뒤쥐	f
까다로운 비둘기	f
따뜻한 대백로	f
흐린 새매	f
호화로운 뻐꾸기	f
매력적인 대백로	f
풍부한 비둘기	f
빠른 콘도르	f
시끄러운 종다리	f
풍부한 뻐꾸기	f
커다란 펭귄	f
까다로운 백로	f
비범한 바다제비	f
풍부한 카나리아	f
깜찍한 앵무새	f
작은 물닭	f
급한 바다제비	f
활기찬 백로	f
깜찍한 제비	f
부드러운 종다리	f
거친 플라밍고	f
부지런한 황새	f
깜찍한 큰부리새	f
신비로운 물닭	f
강렬한 뻐꾸기	f
영리한 참새	f
느린 비둘기	f
매끈한 매	f
딱딱한 바다제비	f
영리한 제비	f
급한 뻐꾸기	f
급한 매	f
빠른 제비	f
기묘한 독수리	f
이상한 솔개	f
강렬한 쇠제비	f
신선한 수리	f
깜찍한 왜가리	f
반짝이는 카나리아	f
흐린 바다오리	t
무서운 메추라기	t
무서운 유리새	t
까다로운 쇠제비	t
깜찍한 홍학	f
영리한 진돗개	f
따뜻한 삑삑이	f
차가운 메추라기	f
신비로운 유리새	f
까다로운 까마귀	f
급한 갈매기	f
반짝이는 오리	f
지친 수리부엉이	f
깜찍한 메추라기	f
차가운 백로	f
교활한 왜가리	f
딱딱한 왜가리	f
강렬한 물수리	f
매끈한 까마귀	f
무서운 고니	f
딱딱한 꿩	f
영리한 독수리	f
딱딱한 큰부리새	f
날카로운 백로	f
이상한 제비	f
신비로운 백로	f
어두운 삑삑이	f
작은 갈매기	f
느린 솔개	f
까다로운 고니	f
교활한 솔개	f
밝은 타조	f
시끄러운 은빛	f
깜찍한 수리부엉이	f
호기심 많은 까마귀	f
기묘한 제비	f
기묘한 꿩	f
딱딱한 플라밍고	f
날카로운 왜가리	f
어두운 대백로	f
부지런한 까마귀	f
활기찬 키위	f
비범한 검독수리	f
부지런한 물닭	f
밝은 수리	f
매력적인 수리부엉이	f
빛나는 독수리	f
신비로운 검독수리	f
빛나는 유리새	f
강렬한 제비	f
신선한 독수리	f
딱딱한 새매	f
영리한 백로	f
신선한 고니	f
따뜻한 바다오리	f
따뜻한 바다제비	f
날카로운 스커	f
매력적인 물닭	f
이상한 거위	f
날카로운 물닭	f
곱슬곱슬한 매	f
느린 거위	f
교활한 황새	f
지친 제비	f
까다로운 타조	f
교활한 종다리	f
교활한 검독수리	f
즐거운 물수리	f
급한 큰부리새	f
평범한 거위	f
급한 쇠백로	f
이상한 뻐꾸기	f
신선한 키위	f
신선한 솔개	f
호기심 많은 수리부엉이	f
강렬한 바다오리	f
호화로운 쇠제비	f
교활한 큰부리새	f
활기찬 앵무새	f
날카로운 느시	f
호기심 많은 백로	f
차가운 왜가리	f
호기심 많은 진돗개	f
흐린 매	f
이상한 플라밍고	f
까다로운 새매	f
커다란 거위	f
부지런한 진돗개	f
신비로운 모래뒤쥐	f
밝은 오리	f
밝은 물닭	f
반짝이는 모래뒤쥐	f
교활한 진돗개	f
호화로운 까마귀	f
빠른 고니	f
반짝이는 비둘기	f
차가운 거위	f
활기찬 타조	f
커다란 메추라기	f
즐거운 펭귄	f
따뜻한 홍학	f
기묘한 바다오리	f
풍부한 오리	f
날카로운 카나리아	f
흐린 참새	f
이상한 까마귀	f
교활한 새매	f
즐거운 진돗개	f
영리한 느시	f
신비로운 거위	f
밝은 검독수리	f
반짝이는 종다리	f
반짝이는 삑삑이	f
호화로운 느시	f
빛나는 갈매기	f
매끈한 느시	f
무서운 홍학	f
흐린 앵무새	f
신선한 카나리아	f
흐린 제비	f
가난한 대백로	f
급한 까마귀	f
풍부한 은빛	f
느린 스커	f
밝은 느시	f
무서운 키위	f
가난한 스커	f
작은 앵무새	f
풍부한 종다리	f
딱딱한 펭귄	f
차가운 독수리	f
깜찍한 새매	f
커다란 타조	f
매끈한 제비	f
강렬한 콘도르	f
지친 키위	f
날카로운 은빛	f
지친 은빛	f
신비로운 삑삑이	f
비범한 새매	f
가난한 참새	f
평범한 제비	f
곱슬곱슬한 수리부엉이	f
빛나는 검독수리	f
매력적인 솔개	t
매력적인 큰부리새	t
시끄러운 키위	t
시끄러운 백로	t
가난한 새매	t
차가운 까마귀	t
즐거운 대백로	t
반짝이는 은빛	t
매력적인 느시	t
커다란 쇠제비	t
따뜻한 쇠제비	t
활기찬 수리	t
부지런한 새매	t
반짝이는 꿩	t
부드러운 타조	t
까다로운 플라밍고	t
조용한 새매	t
\.


--
-- Data for Name: user_device; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_device (user_id, device_token) FROM stdin;
10	AK
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, user_dept, user_nickname, user_role, ms_uuid) FROM stdin;
58	스테인리스사업실	까다로운 쇠제비	ROLE_USER	3426cbd9-d595-4fb6-8f85-998a35eff1ac
61	HR지원실	부지런한 물수리	ROLE_USER	2e022d75-5309-4535-917a-5f9328d656d9
63	HR지원실	무서운 쇠제비	ROLE_USER	5be74b86-6d30-4369-80b1-3fd80f828096
32	경영기획실	부지런한 새매	ROLE_USER	661434ac-a022-4b8e-b51b-a001a9854ccf
34	HR지원실	반짝이는 꿩	ROLE_USER	2b86660e-3457-4930-b17a-46e7d952d711
46	경영기획실	까다로운 삑삑이	ROLE_USER	17e5ece2-422e-4699-b76b-1e7d87415eaf
33	국제금융실	차가운 물수리	ROLE_USER	f1c2505e-3844-4984-ad16-495370d272ea
\.


--
-- Name: categorized_chatbots_categorized_chatbot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorized_chatbots_categorized_chatbot_id_seq', 39, true);


--
-- Name: folders_folder_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.folders_folder_id_seq', 32, true);


--
-- Name: ms_users_ms_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ms_users_ms_pk_seq', 39, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 63, true);


--
-- Name: categorized_chatbots categorized_chatbots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorized_chatbots
    ADD CONSTRAINT categorized_chatbots_pkey PRIMARY KEY (categorized_chatbot_id);


--
-- Name: folders folders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.folders
    ADD CONSTRAINT folders_pkey PRIMARY KEY (folder_id);


--
-- Name: ms_users ms_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ms_users
    ADD CONSTRAINT ms_users_pkey PRIMARY KEY (ms_pk);


--
-- Name: nicknames nicknames_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nicknames
    ADD CONSTRAINT nicknames_pkey PRIMARY KEY (nickname);


--
-- Name: users uk_1jhkr63rrud0dq128hyuh02kk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_1jhkr63rrud0dq128hyuh02kk UNIQUE (ms_uuid);


--
-- Name: ms_users uk_pcuo9s3rd0ukgmaq3igmwrim8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ms_users
    ADD CONSTRAINT uk_pcuo9s3rd0ukgmaq3igmwrim8 UNIQUE (ms_uuid);


--
-- Name: user_device user_device_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_device
    ADD CONSTRAINT user_device_pkey PRIMARY KEY (user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: categorized_chatbots fk_folder; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorized_chatbots
    ADD CONSTRAINT fk_folder FOREIGN KEY (folder_id) REFERENCES public.folders(folder_id) ON DELETE CASCADE;


--
-- Name: categorized_chatbots fkglrd41n6fnvh640t7omhhg88f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorized_chatbots
    ADD CONSTRAINT fkglrd41n6fnvh640t7omhhg88f FOREIGN KEY (folder_id) REFERENCES public.folders(folder_id);


--
-- Name: users fktie3a0dkcuw2mukgch2psemb0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fktie3a0dkcuw2mukgch2psemb0 FOREIGN KEY (ms_uuid) REFERENCES public.ms_users(ms_uuid);


--
-- PostgreSQL database dump complete
--

