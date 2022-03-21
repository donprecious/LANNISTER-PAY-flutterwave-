-- seefs kyc stage tab;e
begin;

insert into kyc_stage ("stageName","slug") values ('basic info','basic-info'),('verified plus','verified-plus');

commit;

-- seeds kyc provider table
begin;

insert into kyc_provider ("providerName","slug") values ('sumsub','sumsub');

commit;

-- seeds kyc requirements table
-- @requires (kyc_stage,kyc_provider)
begin;

insert into kyc_requirement ("requirementName", "slug", "kycProviderId", "kycStageId")
		values('government id', 'government-id', '20acfd4e-9da2-4d51-aaea-3cf6eb3c8246', '3b9d4a0e-234f-4756-9a81-f1227dc6d12c'), ('personal information', 'personal-information', '20acfd4e-9da2-4d51-aaea-3cf6eb3c8246', '3b9d4a0e-234f-4756-9a81-f1227dc6d12c'), ('facial recognition', 'facial-recognition', '20acfd4e-9da2-4d51-aaea-3cf6eb3c8246', '3b9d4a0e-234f-4756-9a81-f1227dc6d12c'), ('proof of address', 'proof-of-address', '20acfd4e-9da2-4d51-aaea-3cf6eb3c8246', 'de732c25-75d6-458d-9132-ce315f212fc7');

commit;