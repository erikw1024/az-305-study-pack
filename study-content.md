# AZ 305 Study Pack

Architecture decisions and exam preparation after AZ 104

**Edition 1.1 | Expanded 22 November 2026 | Australian English**

This pack helps you move from administering Azure to choosing and defending an architecture. Use it to identify requirements, reject unsuitable services, explain trade-offs and test recovery assumptions. Your AZ-104 knowledge is the starting point; spend most of your effort on decisions across services rather than repeating portal procedures.

The scope follows Microsoft's current AZ-305 outline, effective 17 April 2026. The four domains and their weightings are shown below. Passing AZ-305 and holding the required Azure Administrator Associate certification are separate parts of the Azure Solutions Architect Expert certification path. Passing an exam is not itself proof that an associated certification remains active. [S01][S02][S03]

## Contents

1. How to use the pack and judge sources
2. Domain mapped syllabus
3. The architecture decision method
4. Identity governance and monitoring
5. Data storage and integration
6. Business continuity
7. Infrastructure and application architecture
8. Corrections to the supplied guides
9. Six week study schedule
10. Original practice questions
11. Answers and explanations
12. Final revision and readiness
13. Reference library
14. Worked architecture cases
15. Guided labs and acceptance checks
16. Screenshot field guide
17. Further reading and retrieval drills

## 1 How to use the pack and judge sources

### Your study workflow

Start with a baseline attempt at the official assessment. Record weak concepts, your reasoning and confidence. Read the matching section here and the linked Microsoft documentation. Draw a design or perform a small exercise, then answer a fresh question without notes. Revisit mistakes after two days and again after a week.

For every answer, finish this sentence: **I recommend this because it satisfies these constraints; the nearest alternative fails this requirement; this assumption still needs testing.** A correct answer with incorrect reasoning belongs in your error log.

### Source authority and access

| Source | How to use it | Confidence boundary |
|---|---|---|
| Microsoft exam outline and exam page | Determine scope and current logistics | Authoritative for scope; not a catalogue of every possible question |
| Microsoft product documentation | Resolve service behaviour, limits, regions and tiers | Authoritative for documented capabilities; read prerequisites and preview labels |
| Microsoft Architecture Center and frameworks | Compare patterns and assess trade-offs | Strong design guidance; reference architectures still require adaptation |
| Official AI Skills Navigator practice assessment | Baseline, explanations and later readiness check | Official preparation; a practice score does not guarantee an exam result |
| The three supplied Markdown files | Revision prompts and worked reasoning | Useful starting material with corrections in section 8 |
| ExamTopics discussion | Identify competing interpretations to investigate | Third-party discussion, votes and claimed answers are not evidence of correctness |

The learner's [official assessment URL](https://aiskillsnavigator.microsoft.com/en-us/credentials/cert-45b05816a546e99ea5872f433ac74e8fe88c3614934fe90ab2dad0c10bcb313c?search=azure+architecture) is retained as the launch point. Microsoft directs candidates to sign in there and recommends the new experience; the legacy Learn assessment is no longer updated. The signed-in question bank was not accessed or reproduced. [S01][S04]

The [ExamTopics AZ-305 page](https://www.examtopics.com/exams/microsoft/az-305/) returned HTTP 403 during preparation. No individual question, answer or vote count from it has been verified or imported. When reading a discussion yourself, extract the technical claim, check current Microsoft documentation and rewrite the scenario in your own words. Avoid material represented as recalled live exam content; Microsoft's security policy requires exam-content confidentiality. All 32 questions in this pack are original educational scenarios. [S05][S07]

### The supplied materials

The pack reconciles **AZ305-Study-Guide.md** (self-labelled August 2026), **AZ-305_Exam_Walkthroughs.md** (28 walkthroughs) and **AZ-305 Scenario Questions.md** (115 unanswered prompts). Their section numbers are informal study groupings. Application architecture and migration belong within official infrastructure scope; the walkthrough's separate “Databases” grouping belongs within data storage.

Use the original 115 prompts as an extra oral examination bank. Their answers are not implicitly endorsed. The original 28 answers also require the caveats and ambiguity fixes in section 8. The new questions have a separate answer section so you can practise without immediately seeing the solution.

### A practical verification rule

For a disputed answer, record the requirement, feature, service tier, region, documentation URL, date and exact caveat. If a question omits a decisive condition, identify the ambiguity instead of inventing a requirement. For example, a requirement for TLS termination and WAF alone does not distinguish Application Gateway from Front Door.

“Source verified” here means that technical guidance was checked against the linked documentation. It does not mean an architecture was deployed, a service-level agreement was measured, or the official assessment was taken. Recheck changing limits, pricing, availability and exam arrangements before booking or deployment.

## 2 Domain mapped syllabus

### Official weighting

| Official domain | Exam weighting | Suggested share of 60 study hours | Original questions |
|---|---|---|---|
| Identity governance and monitoring | 25–30% | 16 hours | Q01–Q09 |
| Data storage | 20–25% | 14 hours | Q10–Q16 |
| Business continuity | 15–20% | 11 hours | Q17–Q22 |
| Infrastructure | 30–35% | 19 hours | Q23–Q32 |

Weightings are Microsoft's published ranges. Study hours and question allocation are this pack's recommendations. [S01]

### Coverage and evidence checklist

The following learning clusters group the official objectives into practical design tasks. They cover the outline without reproducing its bullet list. “SG” means the supplied study guide; “W” means its companion walkthroughs; “B” means the 115-prompt bank.

| Cluster | Be able to design and justify | Pack section | Supplied starting points |
|---|---|---|---|
| D1A Observability | Collection, routing, retention and alerting | 4 | SG 2; W4; B23–28 |
| D1B Access | Authentication, identity, cloud and on-premises authorisation, key management | 4 | SG 1; W1–2,6; B1–16,101–104 |
| D1C Governance | Hierarchy, tags, compliance and identity lifecycle | 4 | SG 1,12; W3; B17–22 |
| D2A Relational | Engine, tiers, scaling and protection | 5 | SG 9; W11,16; B29–33 |
| D2B Other data | Documents, objects, durability, performance and cost | 5 | SG 3,5; W7–10,12–13; B34–43 |
| D2C Integration | Movement, transformation and analytics | 5 | SG 4; B44–46,99 |
| D3A Recovery | Workload specific backups and recovery objectives | 6 | SG 10; W14–15; B51–60 |
| D3B Availability | Resilience across compute and data | 6 | SG 8–10; W5; B47–50 |
| D4A Compute | VMs, containers, serverless and batch | 7 | SG 8; W21,23; B61–74 |
| D4B Applications | Messaging, events, APIs, cache, configuration and deployment | 7 | SG 6,12; W22,24–26; B85–100,113,115 |
| D4C Migration | Adoption, assessment and movement of applications and data | 7 | SG 11; W27–28; B105–108 |
| D4D Networks | Internet, hybrid access, performance, security and routing | 7 | SG 7,13; W17–20; B75–84 |

Mixed prompts B109–115 span several clusters. Reclassify each by the decision being tested. Tick a cluster complete only when you can explain a design, a rejected alternative and a failure scenario. The reference library supplies the authoritative full outline. [S01]

## 3 The architecture decision method

### Read constraints before naming services

1. **Describe the workload.** Who uses it, from where, with what protocols, data shapes, write patterns and dependencies?
2. **Separate hard constraints from preferences.** Examples: no public endpoint, a required SQL feature, a residency boundary or a maximum recovery time. Lowest administration is a preference unless explicitly mandatory.
3. **Define measurable targets.** Use latency percentiles, throughput, concurrency, retention, recovery point objective (RPO) and recovery time objective (RTO). “Highly available” is insufficient.
4. **Identify the failure boundary.** Host, rack, zone, region, compromised administrator, accidental data deletion or external dependency?
5. **Eliminate incompatible choices.** Check protocol, tier, identity, transaction scope, networking and migration compatibility before cost comparisons.
6. **Choose the simplest qualifying option.** Compare the full operating cost, including people, replication, data transfer, monitoring, recovery and idle capacity.
7. **Explain residual risk and validation.** A design needs load tests, restore tests and operational ownership.

This is an original exam-solving framework informed by the Well-Architected Framework. Use its five quality concerns—reliability, security, cost, operations and performance—to expose trade-offs. CAF provides organisational adoption guidance; Well-Architected focuses on workload quality. [S08][S09]

### A reusable decision record

**Requirement:** ___  
**Hard constraint:** ___  
**Chosen service and tier:** ___  
**Nearest alternative and disqualifier:** ___  
**Identity and network path:** ___  
**Failure handling and data recovery:** ___  
**Cost driver and operating owner:** ___  
**Documentation and validation still needed:** ___

### Numbers an architect should use

RPO measures acceptable lost work; RTO measures acceptable service interruption. A backup taken every four hours cannot by itself support a 15-minute data-loss requirement. A replicated database does not by itself restore application servers, DNS, secrets or user access.

For a simplified serial chain with independent component availability, multiply the component probabilities. For 99.95%, 99.95% and 99.99%, the result is 0.9995 × 0.9995 × 0.9999 = **99.890035%**, about **47.5 minutes unavailable in a 30-day month**. These are illustrative inputs from the supplied question, not current service guarantees. Correlated failures and shared dependencies invalidate simplistic independence assumptions.

For two independent parallel instances where either alone serves the workload, availability is 1 − (1 − A)(1 − B). Two 99.9% instances give 99.9999% mathematically, but a shared database, region, deployment error or identity dependency can dominate. Treat the calculation as a model, not a promise.

## 4 Identity governance and monitoring

### Choose an identity boundary

| Requirement | Starting design | Decisive caveat |
|---|---|---|
| Employees using modern cloud applications | Microsoft Entra ID | Directory roles and Azure resource roles are separate |
| Partners accessing workforce resources | B2B collaboration in a workforce tenant | Invitations alone do not grant access to every application |
| New customer sign-up and social identities | Entra External ID in an external tenant | Confirm provider support and required customisation |
| Application accessing supported Azure services | Managed identity | Still needs service permissions and network reachability |
| On-premises legacy Kerberos or NTLM | AD DS and supported hybrid access | Entra ID is not a drop-in domain controller |

B2C remains relevant to existing deployments, but new customers have been unable to purchase it since 1 May 2025. Use the current External ID model when designing a new customer application. Do not treat External ID as merely a vague obsolete umbrella term. [S14][S15][S16]

For hybrid sign-in, distinguish synchronisation from authentication. Password hash synchronisation reduces sign-in dependency on an on-premises authentication service; pass-through authentication retains an on-premises validation dependency; federation is appropriate only when its requirements justify its added components. Preserving a legacy application's domain authentication is a different decision from enabling modern remote access. [S78]

### Authorisation across the control and data planes

A role assignment combines a principal, a role and a scope. Use groups and the narrowest useful scope. Azure RBAC covers both management actions and supported data actions; Storage Blob Data Reader is itself an Azure RBAC role. Contributor does not mean unrestricted data-plane access, nor does Global Administrator automatically mean Owner of all Azure subscriptions. Avoid granting key-listing permissions when the requirement is data access only. [S10]

For an app reading a Key Vault secret, the full design is: enable its managed identity, grant the appropriate secret-reading data role, configure private connectivity and DNS if required, and use an SDK that obtains tokens. A system-assigned identity follows the resource lifecycle. A user-assigned identity can survive resource replacement or be shared intentionally; sharing increases its security blast radius. [S13]

For on-premises authorisation, retain the application's access model, such as AD groups and file ACLs, while planning authentication and hybrid connectivity. Azure resource RBAC cannot replace permissions inside a legacy file server or database.

### Privileged access and lifecycle

Use PIM eligibility when administrators must activate a role for a limited period with justification, approval and MFA as required. Eligibility is different from a time-bound active assignment. Access reviews address continuing business need; entitlement management addresses requested and expiring packages of access. Design a separate emergency access procedure and review licensing for the features used. [S11]

Conditional Access evaluates identity and context to enforce controls such as MFA, authentication strength, device compliance and blocking. Treat trusted network location as one signal. Translate “unmanaged OR outside the office” carefully: one policy with both conditions can accidentally implement an AND. Test policies in report-only mode and preserve emergency access. Workload identities need their own supported controls; an interactive MFA rule cannot authenticate a background service. [S12]

### Governance at the correct scope

Management groups organise broad policy inheritance; subscriptions provide boundaries for access, quotas and cost; resource groups organise resources with related lifecycles. Tags support ownership, chargeback and operations, but are not security boundaries. Resource-group tags are not automatically inherited by resources.

| Need | Policy or control | Design consideration |
|---|---|---|
| Report a configuration problem | Audit | Existing resources remain running |
| Block an invalid create or update | Deny | Can affect updates to existing non-compliant resources |
| Check for a missing related resource | AuditIfNotExists | Existence check and evaluation timing matter |
| Deploy supporting configuration | DeployIfNotExists | Assign identity and permissions; remediate existing resources |
| Add or change supported properties or tags | Modify | Supported aliases and remediation identity matter |
| Stop accidental management deletion | CanNotDelete lock | Authorised users may remove the lock |

Policy effects are behaviours with evaluation order, not a ladder of “strength”. Existing resources generally need remediation tasks for Modify or DeployIfNotExists. A deny policy does not delete existing resources, but “existing resources unaffected forever” is too broad. [S17][S18]

A compliance initiative groups policies. Azure Policy can assess and enforce technical controls; it does not certify the organisation's legal compliance. Budgets give cost visibility and alerts; a budget is not a universal hard spending cap. An alert-driven shutdown workflow requires explicit design and may be unsafe for production.

### Design the telemetry pipeline

Separate platform metrics, resource logs, subscription Activity Logs, guest OS telemetry and application traces. Use diagnostic settings for supported resource logs and platform data. Use Azure Monitor Agent with data collection rules for guest data. Instrument applications for dependency timings, exceptions and distributed tracing. Not every resource exposes identical diagnostic categories. [S19][S20]

Choose destinations by purpose: Log Analytics for operational queries; Storage for economical retention and suitable immutability; Event Hubs for downstream streaming and SIEM integration. Centralisation should still respect residency, access segregation, retention and cost. Avoid routing every byte into an expensive analytics table simply because it is possible. [S20]

Retention depends on the table plan and analytics versus total retention. The guide's single “30 to 730 days” rule is inadequate. Long-term retention and search jobs have different cost and query characteristics. If the requirement is two years of audit evidence, specify collection, retention, protection from alteration and a tested retrieval procedure. [S21]

Workspace replication is a paid resilience feature. It replicates new ingestion after enablement and configuration to a supported secondary; it does not backfill historical logs. Switchover is an operator-triggered action, not an automatic failover promise. Check supported regions, tables and dependent monitoring components. Cross-workspace queries alone do not create another copy of the logs. [S22]

Choose metric alerts for numerical operational signals, log alerts for query-derived conditions and Activity Log alerts for management events. Specify evaluation window, aggregation, threshold, severity and an action group. Reduce noise through meaningful scope, stateful conditions and suppression during planned work. Test that the action actually reaches the responder and that automated remediation is bounded. [S23]

**Design exercise:** A team needs 30 days of interactive troubleshooting, seven years of protected audit retention and streaming to a SIEM. Draw three destinations and label who can query or delete each, how new resources are onboarded and what happens in a regional outage.

## 5 Data storage and integration

### Start with the data model

Ask whether the workload needs relational joins and transactions, document access, graph traversal, key-value lookup, file protocols, objects or analytical scans. Then ask about transaction boundaries, partitioning, latency, growth, availability and protection. A database product name should follow these answers. [S39]

### Relational service selection

| Candidate | Good starting fit | Requirement that can change the choice |
|---|---|---|
| Azure SQL Database | Managed databases for applications | Instance features, unsupported dependencies or OS control |
| SQL Managed Instance | SQL Server workloads needing supported instance features | Exact compatibility, network model, feature differences and cost |
| SQL Server on Azure VMs | Required OS access or SQL version/control | Customer responsibility for patching, HA and recovery |
| Managed PostgreSQL or MySQL | Existing engine or application compatibility | Do not force a SQL Server service onto a different engine |

SQL Agent, supported linked servers and cross-database behaviour make Managed Instance a strong candidate; they do not prove perfect compatibility. SQL on a VM can meet exact control needs with more operational work. Compare actual features before selecting a target. [S24]

### Service tier compute tier and scale

Treat these as separate decisions. A service tier describes the storage and availability architecture; a compute tier describes how compute is supplied. Compare a baseline General Purpose design with higher I/O and availability needs, and evaluate Hyperscale where its storage architecture, growth or replicas fit. A large database does not automatically require a VM. [S24][S27]

Elastic pools suit many databases whose individual peaks do not coincide. Size for aggregate demand and set per-database limits to contain noisy neighbours. Pooling does not remove capacity planning. Provisioned compute suits predictable sustained activity; serverless can suit variable utilisation, subject to minimums, supported features, pause eligibility and resume latency. [S25][S26]

Read replicas offload suitable reporting but can lag. A claim that reports may be one minute stale is a requirement to validate, not a guaranteed replica lag. Scaling a primary does not resolve every locking, query-plan or application bottleneck. [S24]

### Protect relational data

Point-in-time restore addresses accidental logical changes; long-term retention addresses retained backup history; zone redundancy addresses local infrastructure failure; geo-replication and failover groups address regional continuity. These solve different failures. SQL LTR supports policies up to ten years; it is an explicit configuration, not a ten-year default. [S29][S30]

Encryption at rest protects stored media; it does not stop an authorised query returning clear data. Use database permissions, restricted views, row or column security and, where appropriate, client-side encryption to meet the access requirement. Dynamic data masking reduces casual exposure but is not a strong barrier against users who can infer values through queries. [S42]

### Cosmos DB design

Choose the supported API based on the application and compatibility requirements. For a new document workload, evaluate the NoSQL API. Choose a partition key with enough distinct values and good distribution across storage and throughput; favour common access patterns. A date-only key or a very large single customer can create hot partitions. Multi-region deployment does not repair a poor partition key. [S33]

| Consistency | Requirement it addresses | Limitation to remember |
|---|---|---|
| Strong | Globally current reads within its guarantees | Cannot combine with multiple write regions |
| Bounded staleness | Explicit version or time bound | Multi-region minimum time setting is 300 seconds |
| Session | Read your writes within a session | Session tokens must flow correctly between clients |
| Consistent prefix | Ordered observations | No bounded freshness guarantee |
| Eventual | Maximum tolerance of stale results | Application must tolerate delayed convergence |

Choose the weakest level that satisfies the actual business requirement. Session is not a global cross-user freshness guarantee. Multiple write regions require conflict handling. The ten-second multi-region bounded-staleness example in the supplied walkthrough cannot be configured as written. [S31]

Transactional batch provides all-or-nothing operations within one container and one logical partition key. Two bank accounts in different partitions cannot simply be wrapped in that batch. Choose a relational transaction, remodel the partition boundary or design a distributed workflow with compensation and idempotency. Strong read consistency does not extend transaction scope. [S32]

### Objects files and data lakes

Blob Storage suits objects such as media and backups. Azure Files suits supported SMB/NFS file access; File Sync can support Windows file-server caching and synchronisation. Select according to protocol, identity, locking, performance and connectivity rather than assuming all stored files belong in Blob Storage. [S80]

ADLS Gen2 adds hierarchical namespace and directory-oriented access to Blob Storage. It supports directory ACLs alongside Azure RBAC. A broad RBAC grant can authorise data access before ACL checks restrict anything; do not assume an ACL will narrow an already broad grant. Analytics tooling can work with other supported storage models, so “Databricks always requires HNS” is too absolute. [S38]

For access tiers, balance storage, transactions, retrieval, early-deletion charges and retrieval time. Hot, Cool and Cold are online; Archive is offline. The commonly documented minimum durations for Cool, Cold and Archive are 30, 90 and 180 days. Lifecycle rules can automate transitions, but feature, account and redundancy support matter. Check newer automated tiering separately; do not assume every feature is supported by every account. [S35]

| Redundancy | Primary protection | Regional copy | Secondary reads before failover |
|---|---|---|---|
| LRS | Local infrastructure | No | No |
| ZRS | Availability zones | No | No |
| GRS | Local infrastructure | Asynchronous | No |
| GZRS | Availability zones | Asynchronous | No |
| RA-GRS | Local infrastructure | Asynchronous | Yes for supported services |
| RA-GZRS | Availability zones | Asynchronous | Yes for supported services |

Geo-replication is asynchronous: recent acknowledged writes may not yet exist in the second region. A read-access secondary can be stale and is not writable until an appropriate failover. Redundancy does not provide recovery from every overwrite or malicious deletion. [S34]

Use versioning and soft delete for supported accidental-change recovery; consider point-in-time restore and independent backup where supported. Locked time-based immutability addresses WORM retention. A management lock protects the account control plane, not every blob data-plane operation. Legal holds and retention policies have different release conditions. [S36][S37]

### Integration and analytics

Select integration by source reachability, movement versus transformation, batch versus streaming and team skills. ADF pipelines orchestrate data work; integration runtimes provide the execution and connectivity boundary. Self-hosted integration runtime is a standard candidate for private on-premises sources, but a source being “on premises” alone does not prove it is the only possible connectivity model. [S40]

For analysis, separate transactional serving from historical scans. Compare a warehouse, lake query engine and Spark processing according to concurrency, query pattern, data size, freshness and operational model. Partitioned columnar files such as Parquet can reduce scanned data compared with unpartitioned CSV, but partition choice and file sizes still matter. Modern Fabric services are additional candidates; the exam scenario's stated products and constraints remain decisive. [S41]

**Design exercise:** A retailer needs transactional orders, product documents, large product images and daily margin reporting. Draw separate data paths, justify each model, and identify how analytics obtains data without overloading checkout.

## 6 Business continuity

### Design for three different incidents

High availability keeps a service running through local faults. Disaster recovery restores operation after a larger disruption. Data protection recovers an earlier, valid state after deletion, corruption or attack. A geographically replicated mistake is still a mistake; design all three capabilities deliberately.

Start with a business impact assessment: identify the transactions that must resume first, maximum tolerable lost work, recovery deadline and dependencies. Include identity, DNS, certificates, external APIs, licence servers and operational access. State who declares a disaster and who can authorise failover.

### Match protection to the failure boundary

| Incident | Candidate protection | Missing if used alone |
|---|---|---|
| VM host failure | Multiple instances and appropriate placement | Full zone or region recovery |
| Zone failure | Instances across zones or a supported zone-redundant service | Regional disaster recovery |
| Regional outage | Secondary deployment and data recovery | Accidental deletion history |
| Logical database error | Point-in-time restore | Fast live service takeover |
| Ransomware or hostile administrator | Isolated and protected backups | Application rebuild and operational recovery |

Zones are separated groups of datacentres within a region; availability sets distribute VMs across fault and update domains. The application needs enough healthy instances and a working traffic path. A single zonal resource is not zone redundant. Service and region support, capacity and dependencies must be checked. [S49]

Not every Azure region has a pair, and not every service uses a region pair. Select recovery regions according to supported replication, legal boundaries, distance, latency and capacity. A regional pairing does not deploy your application or guarantee automatic recovery. [S50]

### Backup selection and protection

Use the workload's supported protection method: VM backup, application-aware database backup, managed database PITR/LTR, file backup or object protection. Vault type, backup frequency, consistency and restore granularity vary. A crash-consistent VM snapshot is not automatically a transactionally consistent multi-server application backup.

Azure VM Enhanced backup supports sub-daily schedules, but the documented minimum interval is **four hours**, not hourly recovery points every hour. Shorter objectives need another supported mechanism. SQL transaction-log-based recovery may support a different objective from a VM snapshot. [S43]

Combine retention with protection against tampering. A locked immutable vault blocks destructive changes to protected recovery points. Resource Guard adds separate authorisation for supported critical backup operations. Soft delete provides recovery after supported deletions; its enforced defaults and preview status are evolving. Check the actual vault configuration rather than assuming a universal fixed 14-day rule. [S44][S45][S46]

For managed SQL, configure short-term retention for recent mistakes and LTR for periodic historic copies. An LTR policy retaining selected yearly backups for ten years is not a promise to restore every second of the last decade. Practise restore to a new database, validation and application reconnection. [S29][S30]

### Replication and disaster recovery

Site Recovery is a candidate for supported VM disaster recovery. Replication health, disk churn, bandwidth, application consistency and target capacity affect achievable recovery. Do not memorise one RPO number for all replication sources. Define a recovery plan for ordering and automation, then measure the full application recovery. A recovery plan still needs an appropriate trigger or operational process; it does not detect every outage and autonomously execute the right business decision. [S47]

Use **test failover** on an isolated network to validate the secondary without moving production users. Stop test applications from sending genuine payments, emails or production writes. Clean up the test deployment afterwards. A planned production failover is a separate operation requiring synchronisation, cutover and validation. [S48]

SQL failover groups provide stable read-write and read-only listeners. An automatic policy can support regional recovery, but customer-initiated and Microsoft-managed failover have different timing and control. Consider grace periods, DNS refresh, connection retries and asynchronous data loss. A stable hostname does not keep an existing database session alive. [S28]

### A recovery runbook you can defend

1. Detect the incident and assess whether local remediation is safer than failover.
2. Obtain the required approval; record the recovery point and accepted potential data loss.
3. Recover dependencies and data, then start application tiers in their dependency order.
4. Validate transactions, permissions, outbound integrations and observability.
5. Redirect users, monitor capacity and reconcile any lost or duplicated work.
6. Re-establish protection and plan controlled failback.

**Design exercise:** The business requires RPO 15 minutes and RTO 60 minutes. Allocate the hour among detection, approval, recovery, validation and traffic redirection. Explain why an untested “failover takes five minutes” claim is insufficient.

## 7 Infrastructure and application architecture

### Compute selection

| Hard requirement | Candidate | Check before committing |
|---|---|---|
| OS access or legacy software dependency | VMs or VM scale sets | Patching, images, scaling behaviour and HA |
| Managed web hosting and deployment slots | App Service | Runtime, tier, networking and state |
| Kubernetes APIs, CRDs or custom operators | AKS | Cluster operations, workload security and upgrade ownership |
| Managed containers with event scaling | Container Apps | Ingress, storage, scaling triggers and workload profiles |
| Event-triggered application code | Functions | Hosting plan, timeout, cold start and concurrency |
| Many parallel scheduled tasks or HPC | Batch | Node capacity, data access, retries and checkpointing |

This is a candidate selection matrix, not a universal product ranking. For example, App Service can host containers; a container image alone does not require Kubernetes. Dedicated hardware or specialised HPC networking can justify a different VM design. [S51]

AKS scaling has multiple layers: HPA scales workload replicas, cluster autoscaler supplies nodes for scheduling demand, and KEDA connects suitable workloads to event signals. Node distribution, disruption budgets, topology spread and enough spare capacity must support failure and upgrade requirements. Node pools and taints support scheduling isolation; they are not automatically a hard hostile-tenant security boundary. [S53]

Container Apps can use HTTP and event-based scaling with minimum and maximum replicas. Scale-to-zero depends on the rule and workload configuration; CPU/memory-only rules cannot wake an app from zero. Zero running replicas also does not guarantee a zero total bill across environment, storage and networking resources. [S54]

Functions hosting has evolved. Current documentation recommends Flex Consumption for new serverless function apps; Premium, Dedicated and Container Apps hosting address other requirements. Evaluate networking, always-ready instances, execution limits, platform interruptions and trigger behaviour. Long-running work often benefits from asynchronous orchestration or a job rather than holding one HTTP request open. An “unlimited” configured execution timeout is not immunity from interruption. [S52]

For large parallel work, Batch manages pools, jobs and tasks. Use Spot capacity only if eviction and capacity loss are acceptable, with checkpointing and retry. For short scheduled container jobs with fixed resources, a Container Apps job may be simpler. Match the execution model to the workload instead of choosing a VM merely because a task lasts 20 minutes. [S56]

SQL VM storage is workload-specific. Read-only host caching for supported data disks and no host caching for log disks is a common recommendation. Premium SSD v2 and Ultra Disk do not use the same caching capabilities as older disk types. Size both disk and VM I/O limits. Temporary local storage is disposable and is not durable database storage. [S57]

### Network access and routing

Trace the complete request: client DNS, route, network controls, endpoint, authentication and data permission. These are independent requirements. A successful name lookup does not prove access; an assigned data role does not create a network route.

| Decision | Starting choice | Caveat |
|---|---|---|
| Private PaaS IP reachable through VNet connectivity | Private endpoint | Configure DNS and restrict public access separately |
| Restrict supported public service endpoint to VNets | Service endpoint | Does not give the service a private IP |
| Encrypted internet hybrid tunnel | VPN Gateway | Throughput, redundancy and internet dependency |
| Private provider connectivity | ExpressRoute | Traffic is not encrypted by default |
| Central inspection across a controlled topology | Hub and spoke with Firewall/NVA | Routes and return paths must traverse the intended inspection |
| Managed global transit at scale | Standard Virtual WAN | Routing policy and segmentation still require design |

A private endpoint is an additional private network interface to a supported service. It does not automatically disable its public endpoint. Use suitable service networking settings and private DNS resolution from every client network. A private DNS zone is a common solution; the architectural requirement is correct resolution, including hybrid forwarding, not one mandatory DNS product. [S59]

Ordinary VNet peering is not transitive. Direct spoke peering is valid when permitted. Routing through a hub firewall requires the correct UDRs, forwarding settings, rules and return path. Azure Virtual Network Manager can manage connectivity at scale; managed connectivity features should not be confused with ordinary peering transitivity. [S60]

Virtual WAN provides managed hub transit across branches, users and VNets. It reduces routing administration but does not remove the need to choose route tables, propagation, security inspection and segmentation. ExpressRoute provides private connectivity; add TLS, IPsec or, where appropriate, ExpressRoute Direct MACsec to meet the encryption boundary. Redundant circuits only help when they avoid shared failure paths. [S61][S62]

### Application delivery

| Requirement | Candidate | It does not provide by itself |
|---|---|---|
| Global HTTP delivery, acceleration and edge WAF | Front Door | Private origin access on every tier or protection of a bypassed origin |
| Regional HTTP routing and WAF in a VNet design | Application Gateway | Global DNS routing |
| TCP or UDP distribution | Load Balancer | HTTP path routing or TLS termination |
| DNS-level endpoint selection | Traffic Manager | Proxying, WAF or instant client reconnection |

Global versus regional, protocol, private origin requirements and WAF determine the shortlist. Verify actual SKUs and supported origins; modern cross-region load-balancing options make “Load Balancer is always regional” too broad. Combining an edge service and a regional gateway can be justified when each solves a stated requirement. [S58]

Traffic Manager answers DNS requests and clients connect directly to endpoints. Probe detection, DNS TTL, recursive resolver caching and client behaviour influence failover time. A two-minute routing requirement cannot be guaranteed merely by selecting a short TTL. Traffic Manager also cannot drain or move an already open TCP session. [S63]

### Messaging events and integration

| Requirement | Candidate | Design responsibility |
|---|---|---|
| Business commands with settlement, sessions and dead-lettering | Service Bus | Idempotent processing, lock renewal and poison messages |
| Notification that an event occurred | Event Grid | Duplicate handling, retries and dead-letter configuration |
| Replayable partitioned telemetry stream | Event Hubs | Partition strategy, checkpoints and consumer groups |
| Simple inexpensive work queue | Storage Queue | Visibility management, retries and application poison-message handling |

Commands request work; events report facts. Service Bus queues can have multiple competing receivers, while topic subscriptions support independent delivery paths. Event Hubs preserves order within a partition rather than a global total order. Event Grid is not a fire-and-forget reliability-free service: its supported delivery model includes retries. [S64][S81][S82]

Duplicate detection removes repeated sends with the same MessageId inside its configured history window. It does not make the consumer's external payment and message settlement one atomic operation. Use a durable idempotency key, transactional state changes, an outbox/inbox pattern where appropriate and safe retries. Sessions address related-message ordering, not global exactly-once business execution. [S65]

Logic Apps suits connector-rich, low-code business workflows. Durable Functions suits code-based durable orchestration. ADF suits data pipelines. A broker alone does not orchestrate a two-hour approval and payment process, and a long-running orchestration does not require one uninterrupted two-hour compute invocation.

### APIs configuration caching and deployment

API Management provides gateway policies, API lifecycle controls and consumer-facing abstractions. Use token validation for identity, appropriate rate limits and quotas, payload transformation and controlled telemetry. Subscription keys identify a subscription or application use but are not a complete user authentication or authorisation system. Prevent direct backend access from bypassing the gateway where required. Check tier support for networking, caching and multi-region capabilities. [S68]

App Configuration centralises settings and feature flags; Key Vault holds secrets and cryptographic material. Use separate values or labels for environments and define refresh and rollback behaviour. A feature flag changes runtime behaviour; it does not deploy a missing binary or undo an incompatible database schema. [S69]

Cache-aside reads the cache, loads from the source on a miss and caches the result. Write to the source of truth and invalidate or update cache entries appropriately. Define acceptable staleness, TTL, stampede protection and behaviour if the cache fails. Asynchronous invalidation cannot guarantee that every read is instantly fresh; retain critical authoritative state in a durable store. [S66]

For new Redis designs evaluate Azure Managed Redis. Azure Cache for Redis has tier-specific retirement plans; Basic, Standard and Premium are scheduled to retire on 30 September 2028. Older question wording can still refer to the existing service. Learn the caching pattern and verify lifecycle before choosing a product for a new deployment. [S67]

Use versioned infrastructure and deployment pipelines with review, scoped deployment identities, policy checks and rollback. App Service slots allow warming and swapping on supported tiers, but safe deployment also needs correct slot settings, compatible schemas, state handling and health checks. Use canary rollout when gradual traffic exposure is required. [S55]

Protect dependencies with timeouts, bounded retries with jitter, circuit breakers and isolation. A circuit breaker stops repeated calls to a failing dependency and probes for recovery later. Unlimited retries can increase the outage. Design idempotency before retrying a non-idempotent operation. [S70]

### Migration design

Start with business outcomes, inventory, dependency mapping, target suitability, landing-zone readiness and a cutover plan. CAF's current adoption guidance includes Strategy, Plan, Ready, Adopt, Govern, Secure and Manage. Governance, security and operations continue throughout the programme; they are not tasks postponed until all workloads move. [S09]

Azure Migrate appears throughout older preparation material. Current documentation names the service **Azure Catalyst, formerly Azure Migrate**. Recognise both names and focus on discovery, readiness, dependency analysis, sizing, cost assessment and migration planning. Assess complete dependency groups, not isolated VM counts. [S71]

Choose rehost, refactor, rearchitect, rebuild, replace, retain or retire according to business value and constraints. A mnemonic of five Rs is incomplete as a migration portfolio taxonomy. Rehosting may reduce immediate application change while carrying technical debt and operational cost forward.

For databases, verify the exact source, target, version, online/offline support and current tooling. DMS supports migration scenarios, but it is not a universal online route for every database combination. An online migration still needs final synchronisation and cutover. Rehearse, stop writes when necessary, validate and maintain a rollback decision point. [S72]

For unstructured data, choose between managed migration, network copy and offline transfer based on size, bandwidth, duration, file semantics and downtime. Current AzCopy documentation points to Storage Mover for planned large migrations; AzCopy remains a copy utility. Preserve metadata, ACLs and change capture when required. Validate counts and checksums and plan the final delta. [S73]

**Design exercise:** A web application uses AD authentication, a SQL Agent job, a shared file path and a hardcoded server name. Decide which dependencies block a direct PaaS move, what you would assess, and how you would prove cutover success.

## 8 Corrections to the supplied guides

### Corrections that materially change an answer

The references below identify the supplied file location and the replacement rule. Use these amendments when revisiting the original materials.

**C01 Customer identity — SG1; W1; B2 and B9–10.** Replace the universal “social sign-in means B2C” shortcut with External ID customer tenants for new designs. Existing B2C scenarios must be read in their historical product context. W1's dismissal of External ID is no longer reliable. [S15][S16]

**C02 RBAC — SG1; B14.** Azure RBAC includes supported data-plane roles. Storage Blob Data Contributor is an Azure RBAC role, not a separate non-RBAC system. Distinguish Actions from DataActions and check key-based bypass paths. [S10][S38]

**C03 PIM — SG1; W2.** Eligible and active are not synonyms for temporary and permanent: active assignments can also be time-bound. Eligibility requires activation. Check current licence entitlements rather than treating one SKU as the only licensing path. [S11]

**C04 Policy — SG1; W3; B17–22.** Effects are not ranked by strength. Append can affect create/update requests; Modify and DeployIfNotExists require suitable remediation for existing resources. Deploy the supported Azure Monitor Agent and data collection configuration, rather than designing for the legacy Log Analytics agent. [S17][S19]

**C05 Locks — W6; B16 and B33.** A CanNotDelete lock prevents deletion while present but users with lock-management permissions can remove it. It applies to control-plane operations. The requirement “no owner can ever delete compliance data” needs a supported locked immutability design and broader administrative controls. W6's categorical answer is insufficient. [S18][S37]

**C06 Monitoring retention — SG2; B26.** Not all diagnostic data automatically goes to Log Analytics. Use supported diagnostic settings or collection rules and table-specific retention. A single fixed retention range does not describe every log plan. [S19][S20][S21]

**C07 Workspace replication — SG2; W4.** Do not assume automatic failover or historical backfill. Confirm replication support and manual switchover procedure. W4's absolute claim that Storage data cannot be queried with KQL is also misleading: external-data and other query patterns exist, but exporting logs is not equivalent to a fully available operational Log Analytics workspace. [S22]

**C08 Zones and SLAs — SG8 and SG12; W5.** Zones can contain groups of datacentres, and not every region/service has the same support. VM SLAs depend on configuration; “all single VMs are 99.9%” and “single VMs have no SLA unless Premium SSD” are conflicting oversimplifications. Zone placement alone is not application availability. [S49]

**C09 Blob retention — W7; B39–40.** Lifecycle tiering is a cost mechanism. Add locked immutability where a minimum WORM retention is required; ensure lifecycle deletion rules respect that retention. Archive retrieval and transaction costs may change the cheapest design. [S35][S37]

**C10 Regional copies — W8; B34 and B56.** RA-GZRS supports readable secondary blob data, but asynchronous replication cannot satisfy “every new write exists in both regions at all times”. Specify accepted lag and distinguish read availability from consistency. [S34]

**C11 Data lakes — SG3–4; W9.** HNS is useful for directory semantics and ACLs; it is not a universal prerequisite for every analytics engine or every Databricks workload. Never assume directory ACLs override an existing broad RBAC grant. [S38]

**C12 Disks — SG3; W10.** Temporary disk is local disposable storage, not necessarily host memory, and should not hold durable data. The SQL host-caching pattern is specific to supported disk types and workload guidance, not every database disk. Ultra Disk and Premium SSD v2 do not support host caching. [S57]

**C13 SQL compatibility — W11; B29.** Managed Instance is a candidate for supported instance-level features, not a promise of complete SQL Server equivalence. A requirement for “sub-millisecond latency” must specify whether it means storage I/O, database operation or end-to-end request latency and must be tested. [S24]

**C14 Cosmos staleness — W12.** A ten-second bounded-staleness setting is invalid for the described multi-region account: its minimum time setting is 300 seconds. Strong may satisfy a maximum ten-second age requirement when a globally current read is acceptable; if the question insists on bounded staleness at ten seconds, the requirement is unsatisfiable as written. [S31]

**C15 Cosmos writes and transactions — SG5; W13; B36–37.** Multiple write regions cannot use strong consistency. Session guarantees rely on session-token handling. ACID transactional batch is limited to one logical partition in one container; it is not a general cross-account-transfer solution. [S31][S32]

**C16 Site Recovery — SG10; W14–15; B55–60.** Do not treat illustrative replication intervals or “approximately five minutes” as guaranteed RPO/RTO for every source. A recovery plan supports orchestration, while failover initiation, dependency readiness and validation remain part of recovery. Test failover and planned failover are different operations. [S47][S48]

**C17 Backup frequency — SG10; B52–54.** Enhanced VM backup does not imply one recovery point every hour; the minimum documented interval is four hours. Managed database log backups are a separate capability. Backup security needs actual vault settings, immutable retention where appropriate and separation of critical-operation authority. [S43][S44][S45]

**C18 SQL continuity — SG9; W16; B32 and B55.** Failover groups are the right family for stable regional listeners, but automatic failover timing, grace periods, data loss and client reconnection matter. ASR does not protect a managed SQL Database resource as though it were a customer VM. [S28]

**C19 Hub transit — SG7; W17–18; B76.** Ordinary peering is non-transitive. Direct spoke peering is still technically valid if inspection is not required. W18 does not state mandatory central inspection, so both direct peering and routed hub transit can satisfy its connectivity requirement. Add the inspection condition before treating B as uniquely correct. [S60][S62]

**C20 HTTP routing — W19.** TLS termination, path routing, cookie affinity and WAF do not uniquely eliminate Front Door. Add a regional VNet/private-backend constraint to make Application Gateway the unambiguous choice. [S58]

**C21 Private access and DNS — SG7; B75–77.** A private endpoint does not automatically switch off public access. Correct DNS resolution is required; an Azure Private DNS zone is one supported approach. Service endpoints use the service's public endpoint over Azure networking and are not simply “traffic sent across the public internet”. [S59]

**C22 Functions and containers — SG8; B66 and B71–74.** Use current hosting-plan comparisons, including Flex Consumption. Avoid “VNet means Premium only”, “serverless always costs zero when idle”, or “long duration always means a VM”. Confirm concurrency, timeout, storage and scale triggers. [S52][S54]

**C23 Messaging — SG6; W24; B85.** Service Bus provides building blocks, not universal exactly-once business effects. Its duplicate-detection window and consumer retries require application design. Event Grid supports at-least-once delivery and retries; W24's contrary explanation is wrong. Event Hubs supports partition order and replay, so saying it cannot support ordered processing is too broad. [S64][S65]

**C24 Caching — W25; B94–96.** Learn cache-aside, invalidation and acceptable staleness, and evaluate Azure Managed Redis for new deployments. “Always fresh” plus asynchronous invalidation without coordinating reads is contradictory. Redis persistence or replication alone does not prove zero session loss. [S66][S67]

**C25 API security — W26; B90 and B93.** Subscription keys identify subscription use; they do not replace identity tokens or business authorisation. Sampled telemetry is not automatically an exact billing ledger. Design billing records and reconciliation explicitly. [S68]

**C26 Migration — SG11; W27–28; B105–108.** CAF's current overview includes Secure, and migration strategy lists can include retain/retire. W28's options A and C overlap materially; clarify the source/target and role of each tool. Verify current DMS support rather than assuming all listed engines have an identical online workflow. Recognise Azure Catalyst as the current documentation name for Azure Migrate. [S09][S71][S72]

**C27 Strong data protection — B46 and B104.** Dynamic masking is not sufficient for “analysts can never obtain the values”. For a GA HSM-backed symmetric-key requirement, consider Managed HSM oct-HSM and supported operations. Current documentation also lists symmetric keys in Key Vault Premium as preview, so the blanket statement “Premium cannot ever support symmetric keys” is also too broad. [S42][S74][S75]

**C28 Overpromised outcomes — B8, B57, B58, B95, B102–103 and B109.** One-hour offboarding across SaaS, zero-impact DR, two-minute DNS failover, zero session loss, automatic certificate renewal and sub-10-ms transactions need assumptions, supported integrations and measured evidence. Do not turn the service label into a guarantee. Distinguish design targets from documented guarantees and test results.

### Review status of all 28 supplied walkthroughs

“Retain with caveat” means the main selection remains useful after the referenced amendment; it does not verify a real deployment.

| Walkthrough | Status | Amendment |
|---|---|---|
| W1 B2B and B2C | Rewrite for current customer identity | C01 |
| W2 PIM | Retain with caveat | C03 |
| W3 Policy | Update agent and remediation detail | C04 |
| W4 Workspace DR | Qualify replication and querying | C07 |
| W5 Zones | Qualify SLA and end-to-end availability | C08 |
| W6 Resource locks | Stated absolute requirement is not met | C05 |
| W7 Blob tiers | Retain with retention caveat | C09 |
| W8 RA-GZRS | Revise literal “at all times” claim | C10 |
| W9 ADLS | Retain for stated HNS and ACL needs | C11 |
| W10 SQL disk caching | Retain for supported disk types | C12 |
| W11 SQL Managed Instance | Retain after compatibility assessment | C13 |
| W12 Cosmos staleness | Correct invalid setting | C14 |
| W13 Cosmos multi-write | Retain with session/conflict caveats | C15 |
| W14 RPO and RTO | Remove universal timing guarantee | C16 |
| W15 Backup and ASR | Retain workload-specific distinction | C16 |
| W16 SQL failover groups | Retain with recovery caveats | C18 |
| W17 Virtual WAN | Retain with routing-policy caveat | C19 |
| W18 Spoke connectivity | Ambiguous without inspection constraint | C19 |
| W19 HTTP load balancing | Ambiguous without regional constraint | C20 |
| W20 ExpressRoute | Retain; verify capacity and encryption | Section 7 |
| W21 AKS | Retain for Kubernetes-specific features | Section 7 |
| W22 Logic Apps | Retain for stated low-code preference | Section 7 |
| W23 Scheduled scaling | Retain; allow provisioning and warm-up time | Section 7 |
| W24 Service Bus | Rewrite exactly-once explanation | C23 |
| W25 Cache | Retain pattern; update product lifecycle | C24 |
| W26 APIM | Retain; qualify identity and billing | C25 |
| W27 Migration strategies | Retain scenario mapping; expand taxonomy | C26 |
| W28 Migration tools | Clarify overlapping options | C26 |

## 9 Six week study schedule

### Standard route

Allow approximately **ten hours a week for six weeks**. This is a proposed schedule, not a statement of the hours every candidate needs. Move hours from familiar AZ-104 administration to your weak architecture domains. Use weekdays for reading and retrieval, and a longer weekend session for a design exercise and questions.

| Week | Focus | Ten hour plan | Evidence to keep |
|---|---|---|---|
| 1 | Baseline and identity | 1 h assessment; 4 h identity and governance; 2 h access design; 2 h questions; 1 h correction review | Baseline by domain and a least-privilege design |
| 2 | Monitoring and relational data | 3 h telemetry; 3 h SQL choices; 2 h design exercise; 2 h questions | Telemetry map and SQL decision record |
| 3 | Non-relational data and integration | 3 h Cosmos/Blob; 2 h integration; 2 h protection design; 2 h questions; 1 h spaced review | Partition-key rationale and data lifecycle |
| 4 | Availability and recovery | 3 h HA/DR; 2 h backup security; 2 h recovery exercise; 2 h questions; 1 h weak-domain review | RPO/RTO budget and recovery runbook |
| 5 | Compute networks and applications | 3 h compute; 2 h networking; 2 h app patterns; 2 h questions; 1 h migration | Network path and deployment design |
| 6 | Integration and exam rehearsal | 2 h migration and weak areas; 2 h mixed design; 2 h timed questions; 2 h assessment/review; 2 h final revision | Fresh-answer reasoning and final weak-area list |

Recommended daily loop for a one-hour session: 10 minutes recall, 20 minutes targeted documentation, 20 minutes questions or design, 10 minutes error-log update. Include spaced review rather than six weeks of rereading.

### Use the official assessment three times at most for different purposes

Use the first attempt to find weaknesses. Use a second after targeted study to check whether your reasoning improved. Use a final attempt near the exam only if it still provides meaningful new evidence. If you recognise answers, stop interpreting the score as readiness and use fresh original scenarios instead. Read the official explanations and their linked product documentation. [S04]

### Alternative pacing

For a three-week route, double the weekly time and combine weeks 1–2, 3–4 and 5–6. Keep the recovery exercise and fresh mixed questions. For eight weeks, add one week for data design and one for infrastructure; use the extra time for independent explanation and hands-on validation.

### Eight focused exercises

1. Draw management groups, subscriptions and resource groups for production and development. Place roles, policies and exceptions at explicit scopes.
2. Trace an App Service identity obtaining a secret and accessing SQL. Label authentication, permission, route and DNS separately.
3. Design a telemetry pipeline with operational, archival and streaming destinations. Estimate what drives cost.
4. Compare SQL Database, Managed Instance and SQL on a VM for a dependency-heavy application. Identify the assessment evidence still needed.
5. Choose a Cosmos partition key and test it against a very large customer, bursty writes and cross-partition transactions.
6. Plan a restore and an isolated DR test. Write down measured versus assumed RPO/RTO.
7. Draw a private endpoint's resolution path from on premises and from a spoke VNet.
8. Design payment processing after a consumer crashes between charging the card and settling its message.

These can be paper designs. If implementing them, use a disposable study environment with a cost limit, avoid real customer data and remove paid resources afterwards. A paper exercise is not evidence of a successful deployed test.

### Error log template

| Date | Question or objective | My answer and confidence | Missing constraint or misconception | Source and correction | Recheck date |
|---|---|---|---|---|---|
| ___ | ___ | ___ | ___ | ___ | ___ |

Record high-confidence mistakes first. They usually reveal a memorised shortcut that needs replacing.

## 10 Original practice questions

### Instructions

These 32 questions are educational scenarios written for this pack. They are not Microsoft questions or recalled exam content. Choose **one best answer** unless instructed otherwise. Allow 60–70 minutes, record confidence and explain the decisive constraint before looking at section 11. Timing and scoring are local study recommendations, not an official exam simulation.

The distribution is nine identity/governance/monitoring, seven data, six continuity and ten infrastructure questions. Some questions intentionally test a missing assumption or an impossible requirement.

### Q01 An application identity

**Domain D1B.** An App Service app must read one Key Vault's secrets without storing credentials. The vault is accessible only through a private endpoint. The app has VNet integration, and DNS already resolves the vault correctly. What completes the least-privilege design?

A. Enable the app's managed identity and grant the appropriate secret-reading data role at the vault.  
B. Give the app subscription Contributor and no data role.  
C. Add a service endpoint and grant subscription Reader.  
D. Use an app registration with a client certificate and maintain certificate renewal.

### Q02 Two external audiences

**Domain D1B.** An organisation is starting a new customer app with social sign-in. Separately, suppliers need access to selected workforce applications using their own work identities. Which design best distinguishes the boundaries?

A. Use workforce Global Administrator accounts for both audiences.  
B. Purchase a new Azure AD B2C deployment for customers and assign suppliers Contributor.  
C. Use an Entra External ID external tenant for customers and B2B collaboration in the workforce tenant for suppliers.  
D. Put every customer in the workforce directory and grant all enterprise apps to guests.

### Q03 Temporary production privilege

**Domain D1C.** Engineers need production resource administration only after approval, with MFA, justification and a two-hour activation limit. Quarterly reviews must also confirm continued need. Which design fits?

A. PIM eligible resource roles with activation controls, plus access reviews.  
B. Permanent Contributor with a two-hour Conditional Access sign-in frequency.  
C. Two-hour active assignments granted automatically each morning, plus quarterly reviews.  
D. Access reviews alone, with engineers self-certifying their roles quarterly.

### Q04 Governance remediation

**Domain D1C.** Existing resources lack a CostCenter tag. New supported resources should inherit an approved value from the resource group when missing, and existing resources should be repaired. Which approach is best?

A. A tag on the management group automatically fixes all descendants.  
B. Audit with no remediation.  
C. Append only, because it retrospectively rewrites stored resources.  
D. A suitable Modify policy with a managed identity and permissions, followed by remediation for existing resources.

### Q05 Three telemetry destinations

**Domain D1A.** Supported resource logs need interactive operational queries, delivery to a third-party SIEM and economical protected retention for seven years. What is the best starting design?

A. Route through diagnostic settings to Log Analytics, Event Hubs and suitable protected Storage, with explicit retention and access policies.  
B. Use one workspace with long retention but no downstream SIEM integration or separate protected copy.  
C. Export only aggregate metrics to Storage and query them for the original resource log records.  
D. Retain only the subscription Activity Log and use it instead of resource-specific diagnostics.

### Q06 The missing guest telemetry

**Domain D1A.** Platform CPU metrics are visible for a VM fleet, but required guest OS event logs are missing. The design must use the supported agent and apply consistently across new VMs. What should you recommend?

A. Deploy Azure Monitor Agent and suitable data collection rules, with policy-based onboarding and remediation.  
B. Configure only VM platform diagnostic settings and assume they collect arbitrary guest event channels.  
C. Deploy the legacy Log Analytics agent as the default architecture for every new VM.  
D. Assume platform metrics include all guest event logs and wait.

### Q07 The administrator deletion threat

**Domain D1C.** Blob records must remain unalterable for seven years, including against a storage administrator trying to delete them. Which recommendation best addresses the stated data-retention requirement?

A. RA-GZRS alone, with full administrator access to delete data.  
B. A supported, locked time-based immutability policy, with carefully separated administration.  
C. Versioning and soft delete without protected retention.  
D. A removable CanNotDelete account lock alone.

### Q08 Translate the sign-in condition

**Domain D1B.** An application's policy requires MFA whenever the device is unmanaged **or** the user is outside the approved location. The design must preserve recovery access. What is the best implementation approach?

A. Exclude all approved locations from every MFA policy, regardless of device state.  
B. One rule requiring both unmanaged device and outside location, with no testing.  
C. Model the OR correctly with suitable Conditional Access policies, test in report-only mode and maintain controlled emergency access.  
D. Require MFA only for unmanaged devices, regardless of location.

### Q09 Querying after a regional incident

**Domain D1A.** A supported Log Analytics workspace needs regional resilience with minimal per-resource routing work. Historical logs from before replication is enabled need separate treatment. Which statement is correct?

A. Enable GRS on the workspace's hidden database directly.  
B. Workspace replication copies all past data and requires no operator action.  
C. Cross-workspace queries automatically replicate every log.  
D. Enable supported workspace replication for new ingestion and configuration, and plan a manually triggered switchover and historical-data strategy.

### Q10 A SQL migration constraint

**Domain D2A.** A SQL Server application uses supported SQL Agent jobs and cross-database queries. The organisation wants PaaS, can accept documented compatibility changes and does not need OS access. Which target should it assess first?

A. SQL Database serverless without compatibility assessment.  
B. SQL Managed Instance.  
C. SQL Server on a VM solely because SQL Agent is mentioned.  
D. Azure SQL Database in an elastic pool, assuming pooling adds SQL Agent and instance features.

### Q11 Many bursty databases

**Domain D2A.** A SaaS platform uses separate Azure SQL databases on one logical server. Their peaks rarely coincide. It needs an overall predictable compute budget and per-customer resource controls. Which design is most appropriate to evaluate?

A. Choose per-database serverless solely from individual idle time, without evaluating aggregate demand or resume requirements.  
B. A correctly sized elastic pool with per-database limits.  
C. Individually provision every database for its own peak and rely on tags to cap aggregate compute.  
D. The maximum dedicated compute size for every database.

### Q12 Atomicity across partitions

**Domain D2B.** A Cosmos DB application must update two account documents atomically. They are in different logical partitions. Which advice is correct?

A. Reassess the data model or use a suitable transactional store; a standard transactional batch cannot span those partitions.  
B. Put both writes in a transactional batch without changing the data model.  
C. Enable strong consistency to make the two writes one transaction.  
D. Enable multiple write regions to remove the transaction boundary.

### Q13 A strict freshness bound

**Domain D2B.** A multi-region Cosmos DB account has one write region. The application needs globally current reads and accepts the latency and availability trade-offs. A suggested design uses bounded staleness set to ten seconds. What is the best recommendation?

A. Use eventual consistency because reads are guaranteed current.  
B. Evaluate strong consistency; the proposed multi-region bounded-staleness setting is invalid.  
C. Accept it; multi-region bounded staleness permits any positive time value.  
D. Enable multi-region writes and strong consistency together.

### Q14 Readable secondary objects

**Domain D2B.** Blob data needs zone protection in the primary region and readable regional-secondary copies before failover. The business accepts asynchronous replication lag. Which redundancy fits?

A. ZRS.  
B. GRS without read access.  
C. RA-GZRS.  
D. LRS.

### Q15 Retrieval time disqualifies Archive

**Domain D2B.** Documents are rarely read, but every retrieval must begin within seconds. They will be retained beyond 180 days. Which statement is correct?

A. Rehydration always completes in seconds.  
B. Archive is necessarily best because retention exceeds 180 days.  
C. Evaluate an online tier such as Cool or Cold against access costs; Archive conflicts with the retrieval requirement.  
D. Disable redundancy to make Archive instantly readable.

### Q16 A private data source

**Domain D2C.** ADF must copy nightly data from a private on-premises database with no public endpoint. An approved Windows host can reach it and make outbound connections. Which candidate meets the connectivity requirement?

A. A private DNS zone alone, with no runtime or network route to the source.  
B. A self-hosted integration runtime on the approved host, with supported connector, credentials and network configuration.  
C. A standard Azure integration runtime with no network path into the private on-premises network.  
D. Managed private endpoints without confirming a supported private-link route to the source.

### Q17 Recovery objectives

**Domain D3A.** A VM application requires RPO 15 minutes and RTO 60 minutes. Its only protection is an Enhanced VM backup every four hours. Which assessment is correct?

A. RTO alone proves RPO.  
B. Both objectives are met because the policy is called Enhanced.  
C. The backup schedule cannot by itself meet the RPO; assess supported replication and application recovery, then test the full RTO.  
D. Changing the retention to seven years fixes the 15-minute RPO.

### Q18 A safe recovery drill

**Domain D3A.** A protected VM application must be tested in its recovery region without routing production users to it or interrupting replication. What should you do?

A. Read the backup job's success status and declare the application recovered.  
B. Perform a production failover and hope DNS does not change.  
C. Run an ASR test failover into an isolated network, validate dependencies and external side effects, then clean up.  
D. Delete the primary VMs before testing.

### Q19 Surviving a compromised backup operator

**Domain D3A.** A backup operator's compromised account must not be able to shorten protected retention and destroy recovery points. Which design best reduces that risk?

A. Put all backup and security administration in the same permanent Owner account.  
B. Use geo-replication as the only protection against malicious deletion.  
C. Disable soft delete to simplify cleanup.  
D. Supported locked vault immutability plus separate critical-operation authorisation through Resource Guard, with tested recovery.

### Q20 A database listener across regions

**Domain D3A.** Azure SQL Database needs a stable connection hostname across regional failover and a readable secondary for reporting. Some data loss is acceptable in a forced outage failover. Which design is best?

A. ASR replication of the managed database as a VM.  
B. Zone redundancy alone.  
C. A failover group, correctly configured listeners and policy, plus client retries and tested recovery timing.  
D. A resource lock on the database.

### Q21 A zone failure

**Domain D3B.** A stateless service must continue through loss of one zone. Its database already uses a supported zone-redundant configuration. What completes a suitable application-tier design?

A. Several app instances all in the same zone.  
B. A daily VM snapshot with no redundant runtime.  
C. Sufficient instances distributed across zones, a resilient traffic layer and tested surviving capacity.  
D. An availability set whose instances remain in one datacentre failure boundary.

### Q22 Composite availability

**Domain D3B.** A simplified serial application depends on components with availability 99.95%, 99.95% and 99.99%. Assume independence. What is the approximate composite availability?

A. 99.89%.  
B. 99.963%, using the arithmetic mean.  
C. 99.99%.  
D. 99.95%, using only the least available component.

### Q23 Required Kubernetes features

**Domain D4A.** A container workload requires custom Kubernetes operators, CRDs and custom ingress controllers. The team accepts cluster operational responsibilities. Which candidate best fits?

A. Container Instances groups, assuming groups supply a Kubernetes control plane.  
B. AKS.  
C. Container Apps, assuming arbitrary Kubernetes control.  
D. App Service hosting the container images without Kubernetes extensibility.

### Q24 Scaling a container to zero

**Domain D4A.** An event-driven container should have no running replicas when idle and resume when supported queue messages arrive. It does not need Kubernetes API access. Which design is best to evaluate?

A. A CPU-only scaling rule with zero replicas and no event signal.  
B. Container Apps with an appropriate event scaling rule, minimum replicas zero and verified trigger support.  
C. An always-on dedicated VM with no shutdown process.  
D. AKS solely because an image exists.

### Q25 Selecting a Functions plan

**Domain D4A.** A new serverless Functions workload needs supported private network connectivity. The team wants to minimise management and compare current consumption-based options. What is the right approach?

A. Evaluate Flex Consumption and other suitable plans against networking, cold start, timeout and trigger requirements.  
B. Move to a VM because all Functions plans lack private networking.  
C. Assume only Premium ever supports VNet connectivity.  
D. Select legacy Consumption without checking runtime or plan support.

### Q26 Large parallel computation

**Domain D4A.** An overnight workload contains thousands of independent compute tasks. Tasks checkpoint and can be retried after interruption. The team wants a managed job scheduler and may use cheaper interruptible capacity. Which design fits?

A. A single long-running Function invocation that implements its own worker allocation and scheduler.  
B. AKS with a self-managed job scheduling platform, chosen despite no Kubernetes requirement.  
C. A fixed always-on VM fleet sized for the peak, with a custom task scheduler.  
D. Azure Batch pools and tasks, with suitable Spot capacity and retry/checkpoint handling.

### Q27 Configuration versus secrets

**Domain D4B.** Multiple services need centrally managed feature flags and environment settings. Database credentials must remain in a secret store. Which design is best?

A. Deployment-time environment variables only, requiring a new deployment for each shared feature-flag change.  
B. App Configuration for settings and flags, with Key Vault references or suitable secret retrieval through managed identities.  
C. Independent local configuration files and secrets on every instance, updated manually.  
D. Key Vault for every ordinary setting and feature flag, with custom application polling and no configuration service.

### Q28 Partner API controls

**Domain D4B.** Partner APIs need JWT validation, per-partner throttling and response transformation. Direct backend bypass must be prevented. Which design best addresses the full requirement?

A. A subscription key alone as proof of each end user's identity.  
B. Public backend access with no authorisation because a gateway exists.  
C. Traffic Manager only.  
D. API Management policies with token validation and partner-aware controls, plus restricted backend access and appropriate backend authorisation.

### Q29 Regional private HTTP backends

**Domain D4D.** Private-IP VM backends in one VNet require regional HTTPS termination, path-based routing and WAF. There is no requirement for an edge delivery service. Which candidate most directly fits?

A. Front Door alone, assuming direct routing to arbitrary private VM IPs without a supported origin connectivity design.  
B. Application Gateway with an appropriate WAF configuration.  
C. Traffic Manager.  
D. Standard Load Balancer alone.

### Q30 Crash after payment

**Domain D4B.** A Service Bus consumer charges a card, crashes before completing its message and receives the message again. What design change best prevents a second charge while preserving retry?

A. Enable sessions and assume exactly-once effects.  
B. Increase queue capacity and make no application change.  
C. Use a durable business idempotency key and payment-provider idempotency/reconciliation, coordinating durable processing state and settlement.  
D. Disable retries and discard unacknowledged messages.

### Q31 A constrained migration

**Domain D4C.** A SQL Server workload must move to a supported Managed Instance target with minimal cutover downtime. Its dependencies, unsupported features and available bandwidth are not yet assessed. What should be recommended first?

A. Promise a sub-30-minute cutover solely because the target is PaaS.  
B. Discover and assess dependencies and compatibility; select a currently supported online migration route, rehearse and validate the final cutover.  
C. Copy the data once while allowing unrestricted writes forever.  
D. Use an annual backup as a continuous replication service.

### Q32 Design a complete path

**Domain D4D with D1 and D3 integration.** A managed web application must expose HTTPS to users, keep database access private, use no stored database password and survive one zone loss. The chosen services and region support the required features. Which design is strongest?

A. Private database endpoint alone; ignore DNS, identity and application placement.  
B. A private endpoint that automatically disables public access and guarantees application availability.  
C. A resilient HTTPS entry, supported zone-redundant application and database configurations, managed-identity database permissions, private connectivity and DNS, restricted public database access, and tested failure behaviour.  
D. Three application instances in one zone with a public database password in configuration.

## 11 Answers and explanations

### Answer key

| Questions | Answers |
|---|---|
| Q01–Q08 | A C A D A A B C |
| Q09–Q16 | D B B A B C C B |
| Q17–Q24 | C C D C C A B B |
| Q25–Q32 | A D B D B C B C |

### Q01 A

The managed identity removes application-managed credentials, while a secret-reading data role supplies authorisation. The scenario already supplies networking and DNS. B grants excessive management rights without the required data permission. D can be a valid identity approach elsewhere but requires maintaining credentials that managed identity avoids here. C neither grants secret access nor replaces the private endpoint path. [S10][S13]

### Q02 C

The customer and workforce collaboration boundaries are different. A is grossly overprivileged. B assumes new B2C purchase and confuses Azure resource administration with supplier application access. D grants unnecessary workforce access. For a real deployment, check the chosen identity-provider and application capabilities. [S15][S16]

### Q03 A

PIM activation addresses approved temporary privilege; reviews address continuing need. C grants active access without the required on-demand approval and activation. B changes sign-in frequency without implementing role eligibility. D recertifies access without controlling each privileged activation. Active assignments can be time-bound, but that alone does not meet this workflow. [S11]

### Q04 D

Modify can implement supported tag changes; existing resources require remediation, and the assignment identity needs authority to perform the changes. A invents automatic inheritance. B only reports the problem. C does not retrospectively remediate existing resources. Validate policy aliases and tag support before rollout. [S17][S79]

### Q05 A

The three destinations address distinct query, streaming and protected-retention needs. B omits required integration and protection. C retains aggregate measurements instead of the original records. D substitutes management events for resource-specific logs. Test collection, access controls and retrieval rather than relying on a configured setting alone. [S20][S21]

### Q06 A

Guest events need supported guest collection and collection rules. Fleet onboarding needs both new-resource deployment and existing-resource remediation. B does not collect arbitrary guest event channels. C uses the legacy rather than supported default agent. D incorrectly equates host-visible metrics with guest events. [S19][S79]

### Q07 B

Locked time-based immutability addresses protected data versions for the specified period. D is removable and concerns management operations. C helps accidental-change recovery without meeting the administrator-resistant retention requirement. A provides redundant copies without preventing deletion. Validate support and retention before applying an irreversible lock. [S18][S37]

### Q08 C

The design must express the OR, prove its behaviour and preserve recovery access. B could challenge only users satisfying both conditions. A exempts unmanaged devices in approved locations. D misses managed devices outside those locations. Test against actual applications, identities and device signals. [S12]

### Q09 D

Replication supports resilience for new ingestion and configuration, with an explicit switchover process. C federates queries without copying data. B invents historical backfill and automatic activation. A is not a customer configuration mechanism. Historical availability remains a separate requirement. [S22]

### Q10 B

Supported instance-level features and a PaaS preference make Managed Instance the first candidate. D incorrectly assumes pooling changes engine compatibility. A also ignores compatibility. C meets many features but adds VM administration without a stated need for OS control. Assess precise source features before confirming the target. [S24]

### Q11 B

Pooling shares compute across non-coincident peaks while imposing per-database controls. D and C provision for separate peaks; tags cannot cap database compute. A could fit some workloads but skips the aggregate budget and performance assessment required here. A pool can still saturate if aggregate demand is underestimated. [S25][S26]

### Q12 A

Standard transactional batch is limited to a shared logical partition in one container. C changes read consistency without merging transactions. B violates the batch boundary. D changes write geography without changing the atomicity limit. A distributed workflow may be possible, but its semantics must match the business requirement. [S32]

### Q13 B

Globally current reads point towards strong consistency when the application accepts its trade-offs. The stated bounded-staleness configuration is invalid for a multi-region account. C ignores the minimum, A has no freshness guarantee, and D uses an unsupported combination. If bounded staleness at precisely ten seconds were mandatory, none of those configurations would satisfy it. [S31][S76]

### Q14 C

RA-GZRS combines primary zone protection with readable geo-secondary data for supported Blob configurations. A lacks the second region. B does not provide pre-failover secondary read access or primary zone protection. D provides neither. Accepted asynchronous lag is the condition that makes this answer fit. [S34]

### Q15 C

Seconds-level retrieval needs an online tier. The cheapest qualifying online choice depends on retrieval frequency and charges. B confuses retention duration with access latency. A invents instant rehydration. D cannot change Archive's offline access model. [S35]

### Q16 B

The approved host provides a viable supported bridge to the private source. C lacks a route, D assumes unsupported or unverified connectivity, and A supplies naming without execution or a route. This is a scenario-specific choice; not every on-premises source needs the same runtime topology. [S40]

### Q17 C

Four-hour recovery-point spacing cannot alone guarantee no more than 15 minutes of lost work. Assess supported replication, application consistency and all recovery dependencies, then measure the one-hour recovery budget. B confuses a product label with an objective. A mixes two different measures. D changes history length without improving recovery-point frequency. [S43][S47]

### Q18 C

B test failover validates a secondary copy without a production traffic cutover. Isolation must prevent side effects, and cleanup matters. B is a different operation. D destroys the production side unnecessarily. A proves only a job status, not application recovery. [S48]

### Q19 D

Locked immutability protects retained points; separately controlled critical-operation authority reduces the compromised operator's reach. A creates one broad compromise boundary. C weakens deletion recovery. B can replicate unwanted changes. Ensure the documented vault/workload support matches the implementation. [S44][S45]

### Q20 C

D failover group supplies stable listeners and readable secondary capabilities; client resilience and recovery policy still matter. D is a deletion control. A treats managed SQL as a VM. B protects a zone boundary rather than the required regional boundary. Forced failover can lose asynchronous writes. [S28][S77]

### Q21 C

Instances must survive in other zones with sufficient capacity and a working traffic path. A retains a single-zone failure boundary. B is data recovery without a live redundant tier. D protects smaller fault boundaries without meeting zone-loss resilience. Validate the full stack, including ingress and dependencies. [S49]

### Q22 A

0.9995 × 0.9995 × 0.9999 = 0.998900349975, or about 99.89%. C uses the best component, B averages the components, and D uses the worst component alone. None represents this serial dependency chain. Independence is explicitly provided here and is often unrealistic in production.

### Q23 B

Kubernetes-specific extensibility justifies AKS. C assumes arbitrary access to an abstracted cluster. D hosts containers without the required Kubernetes APIs. A supplies container groups rather than Kubernetes orchestration. The team retains workload, node, upgrade and security responsibilities. [S51]

### Q24 B

The event rule provides the signal needed to wake replicas from zero. D introduces unnecessary Kubernetes requirements. A cannot observe CPU on nonexistent running replicas as a wake-up signal. C retains idle runtime capacity. Confirm event-source authentication, rule configuration and workload behaviour before adopting scale-to-zero. [S54]

### Q25 A

Current hosting comparisons include Flex Consumption. The plan decision must include execution, networking and scaling behaviour. C and B are false universal statements; D skips required compatibility checks. C production choice must also consider regional availability and observed cold-start tolerance. [S52]

### Q26 D

Batch supplies managed pools, scheduling and task handling; checkpointing and interruption tolerance make Spot worth evaluating. A, B and C introduce custom scheduling or platform management that the stated requirements do not justify. Those alternatives can run batch workloads, but Batch most directly meets this managed-scheduler requirement. [S56]

### Q27 B

App Configuration supplies shared settings and feature management while Key Vault protects secret material. D adds custom feature-management behaviour to a secret store. C loses central control. A couples operational flag changes to deployment. Define refresh and failure behaviour so a configuration outage does not disable every service. [S69][S13]

### Q28 D

Gateway token validation, partner-aware throttling and transformation fit APIM; restricted backend access prevents bypass. C does not implement API policies. A confuses a subscription credential with end-user identity. B leaves a direct path around controls. Validate the issuer, audience and claims, and preserve business authorisation at the appropriate layer. [S68]

### Q29 B

The regional VNet/private-backend constraint makes Application Gateway the direct fit. C supplies DNS routing, D lacks the HTTP features, and A assumes a private origin path without designing supported connectivity. A Front Door design can be valid for other requirements; it is unnecessary for the direct regional solution requested here. [S58]

### Q30 C

The redelivery is expected after unsettled processing. Durable idempotency and provider-side safeguards prevent repeated business effects while allowing recovery. A addresses ordering without making an external charge atomic with settlement. D can lose valid work. B does not address duplicate side effects. MessageId duplicate detection alone concerns repeated sends, not every redelivered consumer operation. [S65]

### Q31 B

Assessment and a supported migration route are prerequisites for a defensible cutover plan. A invents an unmeasured guarantee. C cannot reach a consistent final state without handling later writes. D cannot provide continuous low-downtime synchronisation. Verify migration support and rehearse with realistic data and network conditions. [S71][S72]

### Q32 C

It addresses ingress resilience, placement, data availability, identity, connectivity, naming and public-exposure controls as separate requirements. A and B overclaim what a private endpoint does. D retains a zone failure boundary and stored password. C is still a design candidate: prove its capacity and failure behaviour rather than treating the component list as an SLA. [S13][S49][S59]

## 12 Final revision and readiness

### Readiness is a reasoning test

Use these as local study gates, not official pass criteria:

- You can explain every coverage cluster without looking at a product-selection mnemonic.
- On fresh questions, you can justify the selected option and reject the nearest alternative.
- You understand all high-confidence mistakes and have reanswered them after a delay.
- You can distinguish availability, durability, backup history, RPO and RTO.
- You can draw identity, DNS, routing and permission paths separately.
- You can spot requirements that no listed option actually satisfies.
- You have used the official assessment explanations and checked weak areas against current documentation.

As a suggested checkpoint, aim for at least 80% on fresh study questions with no domain below 75%, then examine the mistakes. These percentages are this pack's heuristics. Microsoft's passing score is a scaled 700 and must not be interpreted as “70% correct” or equated to these practice thresholds. [S02]

### Ten final recall prompts

1. What changes when an app needs instance-level SQL features rather than a single relational database?
2. Which failures can a zone-redundant design survive, and which still require another region?
3. How can an application have the correct identity but still fail to access a private database?
4. Why does duplicate detection not make a payment happen exactly once?
5. When can an ADLS ACL fail to restrict a broad role grant?
6. What differentiates a regional reverse proxy from global edge delivery and DNS routing?
7. Why is “data in two regions” not automatically zero regional data loss?
8. Which recovery steps consume time outside the database failover itself?
9. Which source would resolve an apparent contradiction in a community answer?
10. What would you measure before promising the design meets the business requirement?

### Exam logistics and the final week

Use Microsoft's exam page, your booking and the exam sandbox to confirm the current experience. Question count varies. Microsoft's general guidance describes different durations depending on exam type and possible labs; do not treat a fixed number of questions or a remembered time limit as guaranteed for your sitting. A break does not stop the clock, and questions viewed before a break cannot be revisited afterwards. Review the current instructions before starting. [S06]

Check your certification status, account details and identification requirements before booking. During the final days, revise decision records and the correction list, practise reading complete scenarios, and avoid exhausting yourself with repeated memorised assessments. The goal is to recognise a requirement and defend an architecture under time pressure.

## 13 Reference library

Source identifiers beside the study notes and answer explanations link to the references below. Microsoft documentation is the technical authority for this edition. Product pages were checked during preparation; exam scope was rechecked on 21 November 2026. Access limitations are recorded for the assessment and ExamTopics. Service limits, features, previews, names and retirement plans can change.

The supplied Markdown files are learner-provided preparation material, not independently published authorities. They were reviewed for this pack; section 8 records their substantive corrections and the status of all supplied walkthroughs.

- **S01** [AZ 305 skills measured](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-305). Microsoft primary source; documentation checked during preparation.
- **S02** [AZ 305 exam page](https://learn.microsoft.com/en-us/credentials/certifications/exams/az-305/). Microsoft primary source; documentation checked during preparation.
- **S03** [Azure Solutions Architect Expert certification](https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/). Microsoft primary source; documentation checked during preparation.
- **S04** [Official practice assessment supplied by the learner](https://aiskillsnavigator.microsoft.com/en-us/credentials/cert-45b05816a546e99ea5872f433ac74e8fe88c3614934fe90ab2dad0c10bcb313c?search=azure+architecture). Linked entry point; assessment questions not accessed.
- **S05** [ExamTopics AZ 305 discussion reference](https://www.examtopics.com/exams/microsoft/az-305/). Third party; HTTP 403; individual questions and answers not verified.
- **S06** [Exam duration and experience](https://learn.microsoft.com/en-us/credentials/support/exam-duration-exam-experience). Microsoft primary source; documentation checked during preparation.
- **S07** [Exam security policy](https://learn.microsoft.com/en-us/credentials/support/exam-and-assessment-lab-security-policies). Microsoft primary source; documentation checked during preparation.
- **S08** [Azure Well Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/). Microsoft primary source; documentation checked during preparation.
- **S09** [Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/overview). Microsoft primary source; documentation checked during preparation.
- **S10** [Azure RBAC](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview). Microsoft primary source; documentation checked during preparation.
- **S11** [Microsoft Entra PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure). Microsoft primary source; documentation checked during preparation.
- **S12** [Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview). Microsoft primary source; documentation checked during preparation.
- **S13** [Managed identities](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview). Microsoft primary source; documentation checked during preparation.
- **S14** [Active Directory and Microsoft Entra ID compared](https://learn.microsoft.com/en-us/entra/fundamentals/compare). Microsoft primary source; documentation checked during preparation.
- **S15** [External ID customer tenants](https://learn.microsoft.com/en-us/entra/external-id/customers/overview-customers-ciam). Microsoft primary source; documentation checked during preparation.
- **S16** [Azure AD B2C FAQ](https://learn.microsoft.com/en-us/azure/active-directory-b2c/faq). Microsoft primary source; documentation checked during preparation.
- **S17** [Azure Policy effects](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-basics). Microsoft primary source; documentation checked during preparation.
- **S18** [Resource locks](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources). Microsoft primary source; documentation checked during preparation.
- **S19** [Azure Monitor Agent](https://learn.microsoft.com/en-us/azure/azure-monitor/agents/azure-monitor-agent-overview). Microsoft primary source; documentation checked during preparation.
- **S20** [Diagnostic settings](https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/diagnostic-settings). Microsoft primary source; documentation checked during preparation.
- **S21** [Log retention](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/data-retention-configure). Microsoft primary source; documentation checked during preparation.
- **S22** [Workspace replication](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/workspace-replication). Microsoft primary source; documentation checked during preparation.
- **S23** [Azure Monitor alerts](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview). Microsoft primary source; documentation checked during preparation.
- **S24** [Azure SQL deployment choices](https://learn.microsoft.com/en-us/azure/azure-sql/azure-sql-iaas-vs-paas-what-is-overview?view=azuresql). Microsoft primary source; documentation checked during preparation.
- **S25** [SQL elastic pools](https://learn.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview?view=azuresql). Microsoft primary source; documentation checked during preparation.
- **S26** [SQL serverless compute](https://learn.microsoft.com/en-us/azure/azure-sql/database/serverless-tier-overview?view=azuresql). Microsoft primary source; documentation checked during preparation.
- **S27** [SQL Hyperscale](https://learn.microsoft.com/en-us/azure/azure-sql/database/service-tier-hyperscale?view=azuresql). Microsoft primary source; documentation checked during preparation.
- **S28** [SQL failover groups](https://learn.microsoft.com/en-us/azure/azure-sql/database/failover-group-sql-db?view=azuresql). Microsoft primary source; documentation checked during preparation.
- **S29** [SQL automated backups](https://learn.microsoft.com/en-us/azure/azure-sql/database/automated-backups-overview?view=azuresql). Microsoft primary source; documentation checked during preparation.
- **S30** [SQL long term retention](https://learn.microsoft.com/en-us/azure/azure-sql/database/long-term-retention-overview?view=azuresql). Microsoft primary source; documentation checked during preparation.
- **S31** [Cosmos DB consistency](https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels). Microsoft primary source; documentation checked during preparation.
- **S32** [Cosmos DB transactional batch](https://learn.microsoft.com/en-us/azure/cosmos-db/transactional-batch). Microsoft primary source; documentation checked during preparation.
- **S33** [Cosmos DB partitioning](https://learn.microsoft.com/en-us/azure/cosmos-db/partitioning-overview). Microsoft primary source; documentation checked during preparation.
- **S34** [Storage redundancy](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy). Microsoft primary source; documentation checked during preparation.
- **S35** [Blob access tiers](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview). Microsoft primary source; documentation checked during preparation.
- **S36** [Blob data protection](https://learn.microsoft.com/en-us/azure/storage/blobs/data-protection-overview). Microsoft primary source; documentation checked during preparation.
- **S37** [Blob immutability](https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-storage-overview). Microsoft primary source; documentation checked during preparation.
- **S38** [ADLS access control](https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-access-control-model). Microsoft primary source; documentation checked during preparation.
- **S39** [Data models](https://learn.microsoft.com/en-us/azure/architecture/data-guide/technology-choices/understand-data-store-models). Microsoft primary source; documentation checked during preparation.
- **S40** [Integration runtimes](https://learn.microsoft.com/en-us/azure/data-factory/concepts-integration-runtime). Microsoft primary source; documentation checked during preparation.
- **S41** [Analytical processing](https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/online-analytical-processing). Microsoft primary source; documentation checked during preparation.
- **S42** [Dynamic data masking](https://learn.microsoft.com/en-us/azure/azure-sql/database/dynamic-data-masking-overview?view=azuresql). Microsoft primary source; documentation checked during preparation.
- **S43** [Enhanced VM backup policy](https://learn.microsoft.com/en-us/azure/backup/backup-azure-vms-enhanced-policy). Microsoft primary source; documentation checked during preparation.
- **S44** [Immutable backup vaults](https://learn.microsoft.com/en-us/azure/backup/backup-azure-immutable-vault-concept). Microsoft primary source; documentation checked during preparation.
- **S45** [Backup multi user authorisation](https://learn.microsoft.com/en-us/azure/backup/multi-user-authorization). Microsoft primary source; documentation checked during preparation.
- **S46** [Backup secure by default](https://learn.microsoft.com/en-us/azure/backup/secure-by-default). Microsoft primary source; documentation checked during preparation.
- **S47** [Site Recovery FAQ](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-common-questions). Microsoft primary source; documentation checked during preparation.
- **S48** [Site Recovery test failover](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-test-failover-to-azure). Microsoft primary source; documentation checked during preparation.
- **S49** [Availability zones](https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview). Microsoft primary source; documentation checked during preparation.
- **S50** [Region pairs and nonpaired regions](https://learn.microsoft.com/en-us/azure/reliability/regions-paired). Microsoft primary source; documentation checked during preparation.
- **S51** [Compute selection](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree). Microsoft primary source; documentation checked during preparation.
- **S52** [Functions hosting plans](https://learn.microsoft.com/en-us/azure/azure-functions/functions-scale). Microsoft primary source; documentation checked during preparation.
- **S53** [AKS scaling](https://learn.microsoft.com/en-us/azure/aks/concepts-scale). Microsoft primary source; documentation checked during preparation.
- **S54** [Container Apps scaling](https://learn.microsoft.com/en-us/azure/container-apps/scale-app). Microsoft primary source; documentation checked during preparation.
- **S55** [App Service deployment slots](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots). Microsoft primary source; documentation checked during preparation.
- **S56** [Azure Batch](https://learn.microsoft.com/en-us/azure/batch/batch-technical-overview). Microsoft primary source; documentation checked during preparation.
- **S57** [SQL VM storage guidance](https://learn.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/performance-guidelines-best-practices-storage?view=azuresql). Microsoft primary source; documentation checked during preparation.
- **S58** [Azure load balancing choices](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/load-balancing-overview). Microsoft primary source; documentation checked during preparation.
- **S59** [Private endpoints](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview). Microsoft primary source; documentation checked during preparation.
- **S60** [VNet peering](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview). Microsoft primary source; documentation checked during preparation.
- **S61** [ExpressRoute encryption](https://learn.microsoft.com/en-us/azure/expressroute/expressroute-about-encryption). Microsoft primary source; documentation checked during preparation.
- **S62** [Virtual WAN](https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about). Microsoft primary source; documentation checked during preparation.
- **S63** [Traffic Manager DNS routing](https://learn.microsoft.com/en-us/azure/traffic-manager/traffic-manager-how-it-works). Microsoft primary source; documentation checked during preparation.
- **S64** [Asynchronous messaging](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/messaging). Microsoft primary source; documentation checked during preparation.
- **S65** [Service Bus duplicate detection](https://learn.microsoft.com/en-us/azure/service-bus-messaging/duplicate-detection). Microsoft primary source; documentation checked during preparation.
- **S66** [Cache aside](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside). Microsoft primary source; documentation checked during preparation.
- **S67** [Redis retirement FAQ](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/retirement-faq). Microsoft primary source; documentation checked during preparation.
- **S68** [API Management](https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts). Microsoft primary source; documentation checked during preparation.
- **S69** [App Configuration](https://learn.microsoft.com/en-us/azure/azure-app-configuration/overview). Microsoft primary source; documentation checked during preparation.
- **S70** [Circuit breaker](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker). Microsoft primary source; documentation checked during preparation.
- **S71** [Azure Catalyst formerly Azure Migrate](https://learn.microsoft.com/en-us/azure/migrate/migrate-services-overview?view=migrate). Microsoft primary source; documentation checked during preparation.
- **S72** [Database Migration Service](https://learn.microsoft.com/en-us/azure/dms/dms-overview). Microsoft primary source; documentation checked during preparation.
- **S73** [AzCopy and migration guidance](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10). Microsoft primary source; documentation checked during preparation.
- **S74** [Key Vault key types](https://learn.microsoft.com/en-us/azure/key-vault/keys/about-keys). Microsoft primary source; documentation checked during preparation.
- **S75** [Managed HSM algorithms](https://learn.microsoft.com/en-us/azure/key-vault/managed-hsm/about-keys-details). Microsoft primary source; documentation checked during preparation.
- **S76** [Configure Cosmos DB consistency and sessions](https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-manage-consistency). Microsoft primary source; documentation checked during preparation.
- **S77** [SQL business continuity](https://learn.microsoft.com/en-us/azure/azure-sql/database/business-continuity-high-availability-disaster-recover-hadr-overview?view=azuresql). Microsoft primary source; documentation checked during preparation.
- **S78** [Hybrid authentication choices](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn). Microsoft primary source; documentation checked during preparation.
- **S79** [Azure Policy remediation](https://learn.microsoft.com/en-us/azure/governance/policy/how-to/remediate-resources). Microsoft primary source; documentation checked during preparation.
- **S80** [Azure Files](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction). Microsoft primary source; documentation checked during preparation.
- **S81** [Event Grid delivery and retry](https://learn.microsoft.com/en-us/azure/event-grid/delivery-and-retry). Microsoft primary source; documentation checked during preparation.
- **S82** [Event Hubs features](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-features). Microsoft primary source; documentation checked during preparation.
- **S83** [Blob lifecycle management](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview). Microsoft primary source; documentation checked during preparation.

- **S84** [Azure resource PIM role settings](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-resource-roles-configure-role-settings). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S85** [Microsoft Entra PIM role settings](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S86** [Configure a SQL Database failover group](https://learn.microsoft.com/en-us/azure/azure-sql/database/failover-group-configure-sql-db?view=azuresql&tabs=azure-portal). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S87** [Configure Blob lifecycle management](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-configure?tabs=azure-portal). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S88** [Manage Immutable vault operations](https://learn.microsoft.com/en-us/azure/backup/backup-azure-immutable-vault-how-to-manage). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S89** [Private endpoint DNS configuration](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S90** [Workload identity federation](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S91** [Transactional outbox with Cosmos DB](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/transactional-out-box-cosmos). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S92** [Define reliability targets and metrics](https://learn.microsoft.com/en-us/azure/well-architected/reliability/metrics). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S93** [Always Encrypted documentation](https://learn.microsoft.com/en-us/azure/azure-sql/database/always-encrypted-landing?view=azuresql). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S94** [Shared access signature guidance](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S95** [API Management JWT validation policy](https://learn.microsoft.com/en-us/azure/api-management/validate-jwt-policy). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S96** [Configure Key Vault key rotation](https://learn.microsoft.com/en-us/azure/key-vault/keys/how-to-configure-key-rotation). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S97** [Restore SQL Database using backups](https://learn.microsoft.com/en-us/azure/azure-sql/database/recovery-using-backups?view=azuresql). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S98** [Failure mode analysis](https://learn.microsoft.com/en-us/azure/well-architected/reliability/failure-mode-analysis). Microsoft primary source; supplemental documentation checked 22 November 2026.
- **S99** [Azure Load Testing overview](https://learn.microsoft.com/en-us/azure/app-testing/load-testing/overview-what-is-azure-load-testing). Microsoft primary source; supplemental documentation checked 22 November 2026.

### Link definitions

[S01]: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-305 "AZ 305 skills measured"
[S02]: https://learn.microsoft.com/en-us/credentials/certifications/exams/az-305/ "AZ 305 exam page"
[S03]: https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/ "Azure Solutions Architect Expert certification"
[S04]: https://aiskillsnavigator.microsoft.com/en-us/credentials/cert-45b05816a546e99ea5872f433ac74e8fe88c3614934fe90ab2dad0c10bcb313c?search=azure+architecture "Official practice assessment supplied by the learner"
[S05]: https://www.examtopics.com/exams/microsoft/az-305/ "ExamTopics AZ 305 discussion reference"
[S06]: https://learn.microsoft.com/en-us/credentials/support/exam-duration-exam-experience "Exam duration and experience"
[S07]: https://learn.microsoft.com/en-us/credentials/support/exam-and-assessment-lab-security-policies "Exam security policy"
[S08]: https://learn.microsoft.com/en-us/azure/well-architected/ "Azure Well Architected Framework"
[S09]: https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/overview "Cloud Adoption Framework"
[S10]: https://learn.microsoft.com/en-us/azure/role-based-access-control/overview "Azure RBAC"
[S11]: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure "Microsoft Entra PIM"
[S12]: https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview "Conditional Access"
[S13]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview "Managed identities"
[S14]: https://learn.microsoft.com/en-us/entra/fundamentals/compare "Active Directory and Microsoft Entra ID compared"
[S15]: https://learn.microsoft.com/en-us/entra/external-id/customers/overview-customers-ciam "External ID customer tenants"
[S16]: https://learn.microsoft.com/en-us/azure/active-directory-b2c/faq "Azure AD B2C FAQ"
[S17]: https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-basics "Azure Policy effects"
[S18]: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources "Resource locks"
[S19]: https://learn.microsoft.com/en-us/azure/azure-monitor/agents/azure-monitor-agent-overview "Azure Monitor Agent"
[S20]: https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/diagnostic-settings "Diagnostic settings"
[S21]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/data-retention-configure "Log retention"
[S22]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/workspace-replication "Workspace replication"
[S23]: https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview "Azure Monitor alerts"
[S24]: https://learn.microsoft.com/en-us/azure/azure-sql/azure-sql-iaas-vs-paas-what-is-overview?view=azuresql "Azure SQL deployment choices"
[S25]: https://learn.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview?view=azuresql "SQL elastic pools"
[S26]: https://learn.microsoft.com/en-us/azure/azure-sql/database/serverless-tier-overview?view=azuresql "SQL serverless compute"
[S27]: https://learn.microsoft.com/en-us/azure/azure-sql/database/service-tier-hyperscale?view=azuresql "SQL Hyperscale"
[S28]: https://learn.microsoft.com/en-us/azure/azure-sql/database/failover-group-sql-db?view=azuresql "SQL failover groups"
[S29]: https://learn.microsoft.com/en-us/azure/azure-sql/database/automated-backups-overview?view=azuresql "SQL automated backups"
[S30]: https://learn.microsoft.com/en-us/azure/azure-sql/database/long-term-retention-overview?view=azuresql "SQL long term retention"
[S31]: https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels "Cosmos DB consistency"
[S32]: https://learn.microsoft.com/en-us/azure/cosmos-db/transactional-batch "Cosmos DB transactional batch"
[S33]: https://learn.microsoft.com/en-us/azure/cosmos-db/partitioning-overview "Cosmos DB partitioning"
[S34]: https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy "Storage redundancy"
[S35]: https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview "Blob access tiers"
[S36]: https://learn.microsoft.com/en-us/azure/storage/blobs/data-protection-overview "Blob data protection"
[S37]: https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-storage-overview "Blob immutability"
[S38]: https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-access-control-model "ADLS access control"
[S39]: https://learn.microsoft.com/en-us/azure/architecture/data-guide/technology-choices/understand-data-store-models "Data models"
[S40]: https://learn.microsoft.com/en-us/azure/data-factory/concepts-integration-runtime "Integration runtimes"
[S41]: https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/online-analytical-processing "Analytical processing"
[S42]: https://learn.microsoft.com/en-us/azure/azure-sql/database/dynamic-data-masking-overview?view=azuresql "Dynamic data masking"
[S43]: https://learn.microsoft.com/en-us/azure/backup/backup-azure-vms-enhanced-policy "Enhanced VM backup policy"
[S44]: https://learn.microsoft.com/en-us/azure/backup/backup-azure-immutable-vault-concept "Immutable backup vaults"
[S45]: https://learn.microsoft.com/en-us/azure/backup/multi-user-authorization "Backup multi user authorisation"
[S46]: https://learn.microsoft.com/en-us/azure/backup/secure-by-default "Backup secure by default"
[S47]: https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-common-questions "Site Recovery FAQ"
[S48]: https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-test-failover-to-azure "Site Recovery test failover"
[S49]: https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview "Availability zones"
[S50]: https://learn.microsoft.com/en-us/azure/reliability/regions-paired "Region pairs and nonpaired regions"
[S51]: https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree "Compute selection"
[S52]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-scale "Functions hosting plans"
[S53]: https://learn.microsoft.com/en-us/azure/aks/concepts-scale "AKS scaling"
[S54]: https://learn.microsoft.com/en-us/azure/container-apps/scale-app "Container Apps scaling"
[S55]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots "App Service deployment slots"
[S56]: https://learn.microsoft.com/en-us/azure/batch/batch-technical-overview "Azure Batch"
[S57]: https://learn.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/performance-guidelines-best-practices-storage?view=azuresql "SQL VM storage guidance"
[S58]: https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/load-balancing-overview "Azure load balancing choices"
[S59]: https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview "Private endpoints"
[S60]: https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview "VNet peering"
[S61]: https://learn.microsoft.com/en-us/azure/expressroute/expressroute-about-encryption "ExpressRoute encryption"
[S62]: https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about "Virtual WAN"
[S63]: https://learn.microsoft.com/en-us/azure/traffic-manager/traffic-manager-how-it-works "Traffic Manager DNS routing"
[S64]: https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/messaging "Asynchronous messaging"
[S65]: https://learn.microsoft.com/en-us/azure/service-bus-messaging/duplicate-detection "Service Bus duplicate detection"
[S66]: https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside "Cache aside"
[S67]: https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/retirement-faq "Redis retirement FAQ"
[S68]: https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts "API Management"
[S69]: https://learn.microsoft.com/en-us/azure/azure-app-configuration/overview "App Configuration"
[S70]: https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker "Circuit breaker"
[S71]: https://learn.microsoft.com/en-us/azure/migrate/migrate-services-overview?view=migrate "Azure Catalyst formerly Azure Migrate"
[S72]: https://learn.microsoft.com/en-us/azure/dms/dms-overview "Database Migration Service"
[S73]: https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10 "AzCopy and migration guidance"
[S74]: https://learn.microsoft.com/en-us/azure/key-vault/keys/about-keys "Key Vault key types"
[S75]: https://learn.microsoft.com/en-us/azure/key-vault/managed-hsm/about-keys-details "Managed HSM algorithms"
[S76]: https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-manage-consistency "Configure Cosmos DB consistency and sessions"
[S77]: https://learn.microsoft.com/en-us/azure/azure-sql/database/business-continuity-high-availability-disaster-recover-hadr-overview?view=azuresql "SQL business continuity"
[S78]: https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn "Hybrid authentication choices"
[S79]: https://learn.microsoft.com/en-us/azure/governance/policy/how-to/remediate-resources "Azure Policy remediation"
[S80]: https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction "Azure Files"
[S81]: https://learn.microsoft.com/en-us/azure/event-grid/delivery-and-retry "Event Grid delivery and retry"
[S82]: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-features "Event Hubs features"
[S83]: https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview "Blob lifecycle management"
[S84]: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-resource-roles-configure-role-settings "Azure resource PIM role settings"
[S85]: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings "Microsoft Entra PIM role settings"
[S86]: https://learn.microsoft.com/en-us/azure/azure-sql/database/failover-group-configure-sql-db?view=azuresql&tabs=azure-portal "Configure a SQL Database failover group"
[S87]: https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-configure?tabs=azure-portal "Configure Blob lifecycle management"
[S88]: https://learn.microsoft.com/en-us/azure/backup/backup-azure-immutable-vault-how-to-manage "Manage Immutable vault operations"
[S89]: https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns "Private endpoint DNS configuration"
[S90]: https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation "Workload identity federation"
[S91]: https://learn.microsoft.com/en-us/azure/architecture/databases/guide/transactional-out-box-cosmos "Transactional outbox with Cosmos DB"
[S92]: https://learn.microsoft.com/en-us/azure/well-architected/reliability/metrics "Define reliability targets and metrics"
[S93]: https://learn.microsoft.com/en-us/azure/azure-sql/database/always-encrypted-landing?view=azuresql "Always Encrypted documentation"
[S94]: https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview "Shared access signature guidance"
[S95]: https://learn.microsoft.com/en-us/azure/api-management/validate-jwt-policy "API Management JWT validation policy"
[S96]: https://learn.microsoft.com/en-us/azure/key-vault/keys/how-to-configure-key-rotation "Configure Key Vault key rotation"
[S97]: https://learn.microsoft.com/en-us/azure/azure-sql/database/recovery-using-backups?view=azuresql "Restore SQL Database using backups"
[S98]: https://learn.microsoft.com/en-us/azure/well-architected/reliability/failure-mode-analysis "Failure mode analysis"
[S99]: https://learn.microsoft.com/en-us/azure/app-testing/load-testing/overview-what-is-azure-load-testing "Azure Load Testing overview"

## 14 Worked architecture cases

These four original cases connect the syllabus to a defensible design. The organisations, numbers and targets are fictional requirements for practice. Proposed designs are reasoned examples, not Microsoft reference architectures or guarantees. First write your own recommendation; then compare the decisive constraints and failure tests.

### Case A — A regulated client portal

**Domains:** D1 identity and monitoring; D2 data; D4 infrastructure.

**Brief:** A small Australian professional-services firm needs a public HTTPS portal. Employees administer the service, clients upload documents, and the application stores case metadata in a relational database. The firm wants minimal server maintenance and auditable access. A client must never access another client's documents. The starting requirement is one Azure region; regional recovery is a separate budget decision.

**Proposed design:** Start with App Service for the web application, Azure SQL Database for relational metadata and Blob Storage for documents. Use workforce Microsoft Entra identities for staff and evaluate External ID for client identities. Give the application a managed identity and narrowly scoped data permissions. Keep client authorisation in the application: an authenticated user and a valid token do not prove ownership of a requested case. Treat private connectivity, data permissions and business authorisation as three separate controls. [S13][S15][S24][S59]

**Data flow:** Client authenticates, submits a case request, and the API checks the client's entitlement. The API writes metadata and accesses the matching object using its workload identity. If direct browser upload is justified, the backend issues a narrowly scoped, short-lived user delegation SAS for the authorised blob. Record who requested the operation; never log the SAS token. [S94]

**Why this fits:** Managed services reduce operating-system administration. AKS adds orchestration work without an identified requirement for Kubernetes. A VM may become appropriate if an unsupported dependency needs operating-system access. Neither a private endpoint nor Storage Blob Data Contributor creates the application's tenant isolation model. [S10][S51]

**Acceptance evidence:** Attempt cross-client reads, uploads with expired access, access from a disallowed network, and staff administration without an eligible role activation. Check diagnostic records for a failed access attempt and trace one successful request across components. An HTTP 200 home page is insufficient evidence that uploads, authorisation and database writes work. [S20][S23]

**Change one constraint:** The firm must keep document content encrypted from database administrators. Explain why TDE or data masking alone does not meet that threat model; investigate client-side encryption and, for sensitive SQL columns, Always Encrypted, including driver and key-access implications. [S42][S93]

### Case B — A reliable order-processing pipeline

**Domains:** D2 data and integration; D4 application architecture.

**Brief:** A retailer accepts orders during short promotional bursts. Checkout should acknowledge accepted work promptly; fulfilment can continue asynchronously. Payment and dispatch must not happen twice when a message is redelivered. An order's state and its pending integration event must remain consistent.

**Proposed design:** Put an API in front of a durable order store. Persist the order and an outbox record in one transaction, then publish the outbox event to a Service Bus queue. A worker processes the command and records the business operation identifier before completing the message. Use an idempotent payment API or a persisted payment operation key; a broker's duplicate-detection window cannot prevent every duplicate business effect. [S64][S65][S91]

**Partition decision:** In a Cosmos DB implementation, an order and its outbox entry must share the container and logical partition for a transactional batch. Choose the partition key from workload distribution and required transaction boundaries. A date-only key that concentrates a promotion into one hot partition is a warning. In a relational implementation, keep the equivalent writes in a database transaction and use an appropriate publisher. [S32][S33][S91]

**Why this fits:** Service Bus is suited to work that consumers must handle reliably. Event Grid is useful for event notifications but its delivery and retry behaviour still requires idempotency. Event Hubs addresses stream ingestion and replay rather than replacing a business command queue by default. [S64][S81][S82]

**Failure walk-through:** Stop the publisher after the order commit: the pending outbox record must still exist. Stop a worker after charging but before message completion: redelivery must not charge again. Send a poison message: it must stop cycling indefinitely and be visible for investigation. Let downstream processing slow down: observe queue age and backlog, not just worker CPU.

**Acceptance evidence:** Keep an execution log for a repeated operation key, the final order state and a deliberately failed message. Scale workers with backlog and downstream capacity in mind; extra consumers can overwhelm a constrained database. [S54][S65]

**Change one constraint:** Every operation for one order must preserve sequence while unrelated orders run in parallel. Investigate message sessions and the order identifier as a grouping key; do not serialise the entire retailer through a single worker.

### Case C — Recovery for a booking service

**Domains:** D3 business continuity; D2 data; D4 networking.

**Brief:** A booking application has a fictional regional-outage RTO of 60 minutes and RPO of five minutes. Corrupt data must also be recoverable to an earlier point. The business will accept asynchronous replication only after it understands possible data loss. The team has limited out-of-hours staffing.

**Proposed design:** Separate zone resilience, regional failover and historical recovery. Evaluate zone-capable compute and SQL configurations for local faults, a SQL failover group and prepared application capacity in a second region for regional recovery, and automated backups for earlier recovery points. Confirm region, tier, capacity and dependency support rather than assuming that a region pair solves every component. [S28][S29][S49][S50]

**Recovery sequence:** Detect a failed business transaction; confirm the incident and replication state; authorise the chosen failover; recover data services; validate the application's identity, configuration, private DNS and network access; redirect traffic; prove a booking and a read-back; reconcile any uncertain transactions. Assign an owner and a time budget to every step. A database failover command completing within the target does not prove the full application meets its RTO. [S77][S86][S89]

**Why backups remain necessary:** Replication can propagate an unwanted update. Point-in-time restore creates a recovered database rather than rewinding the existing database in place. Plan how to validate it, reconcile later legitimate changes and reconnect the application. Restore duration depends on workload and recovery conditions. [S97]

**Decision caveat:** An RPO requirement is a business tolerance, not a promise inferred from the existence of asynchronous replication. Measure replication and exercise the selected failover mode. If the business changes to zero accepted data loss, revisit write acknowledgement, failure handling and the service's documented guarantees before retaining the design.

**Acceptance evidence:** Record detection time, decision delay, data-service recovery, application validation, traffic change and the last confirmed booking. Repeat a historical restore separately from a regional failover. Include identity-provider and DNS failures in the incident discussion. [S98]

**Change one constraint:** Regional recovery is rarely needed and cost dominates. Compare restoring from geo-redundant backups against a warm secondary, making the longer recovery path and missing capacity reservations explicit. [S77]

### Case D — Move a legacy reporting estate

**Domains:** D4 migration and compute; D2 data; D1 governance.

**Brief:** A manufacturer has a Windows web application, SQL Server jobs and a nightly report process that reads files on-premises. The first release has a short change window and must preserve business output. Modernisation can happen after the migration.

**Decision sequence:** Inventory dependencies and compatibility before choosing a target. Assess whether SQL Database supports the required features, whether Managed Instance fits instance-level dependencies, or whether SQL Server on Azure VMs is necessary. Select a compute target from operating-system, runtime, networking and support requirements. A migration deadline can justify rehosting, but it does not make rehosting the cheapest long-term operating model. [S24][S51][S71][S72]

**Hybrid integration:** If Data Factory must reach an on-premises data source, evaluate a self-hosted integration runtime and its host availability. Document name resolution, routing, firewall access and credentials. A private endpoint to a cloud service does not by itself give that service a path to an on-premises file share. [S40][S59]

**Cutover design:** Rehearse against a representative data copy. Establish the permitted write-freeze duration, perform initial transfer and any supported catch-up, stop the old writers, confirm synchronisation, switch clients and validate record counts plus representative business totals. Give the rollback decision a deadline. If the new system accepts writes, simply redirecting users back can lose or split business transactions; decide how to reconcile them before cutover.

**Acceptance evidence:** Run a complete overnight reporting cycle, reconcile totals and compare duration under representative load. Check service accounts, scheduled jobs, permissions, backup restoration and operations ownership. Infrastructure deployment alone is not business acceptance. Use a load test to investigate throughput and latency rather than guessing from a VM size. [S99]

**Change one constraint:** The application must become independently deployable services within the same deadline. Identify the extra discovery, data ownership, integration and test work; challenge the schedule assumption instead of labelling a VM move as completed modernisation.

## 15 Guided labs and acceptance checks

These are optional practice exercises, not labs already performed for this pack. Each can start as a no-cost design review using the linked documentation. If you implement an exercise, use a disposable learning environment, estimate charges first and keep a cleanup record. Licensing, privileges and service support vary. Do not lock immutable retention in an ordinary disposable lab.

### Lab 1 — Separate role eligibility from application identity

**Map:** D1. **Timebox:** 35 minutes. **Mode:** Design review; optional tenant configuration with suitable licensing.

1. Draw a human administrator activating an eligible Azure role and an application accessing Blob Storage through a managed identity.
2. Identify the role, assignment scope, activation duration, approval path and audit evidence for the human.
3. Identify the data-plane permission for the application and a test that fails when it is removed.
4. Compare Microsoft Entra role settings with Azure resource role settings. For Azure resource PIM, settings at a higher resource scope are not inherited by a lower scope. [S84][S85]

**Pass check:** Explain why PIM activation does not issue the application's storage permissions and why Contributor alone is insufficient evidence of blob data access. Capture only redacted learning-environment evidence. [S10][S13]

### Lab 2 — Design a useful diagnostic route

**Map:** D1. **Timebox:** 30 minutes. **Mode:** Documentation review or a supported disposable resource.

1. Pick one resource type and identify the resource-log categories it actually supports.
2. Choose Log Analytics for investigation, Storage for a justified archive, or Event Hubs for an external processing path; justify every destination.
3. Define a harmless event that should appear and the fields needed to investigate it.
4. Specify retention, sensitive-data handling, alert routing and an owner for checking ingestion. [S20][S21][S23]

**Pass check:** Show an event at the intended destination, or clearly mark the exercise as design-only. Distinguish resource logs from guest operating-system collection through Azure Monitor Agent. Allow for ingestion delay before diagnosing failure. [S19][S20]

### Lab 3 — Remediate a governance gap

**Map:** D1. **Timebox:** 35 minutes. **Mode:** Design review; optional isolated subscription exercise.

1. Choose an audit finding for an existing resource and compare audit, deny, modify and deployIfNotExists effects.
2. Read the selected policy's roleDefinitionIds and identify the identity used for remediation.
3. Define the target scope and exclusions, then describe a remediation task for existing non-compliant resources.
4. Decide how you will check both task execution and the resulting resource configuration. [S17][S79]

**Pass check:** Explain why assigning an audit policy does not repair a resource and why remediation needs appropriate permissions. A green task status should be supported by a configuration check.

### Lab 4 — Choose a blob lifecycle rule

**Map:** D2. **Timebox:** 25 minutes. **Mode:** Policy design; optional test container.

1. Classify a dataset by access frequency, retrieval urgency and mandatory retention.
2. Propose tier transitions and a precise container/prefix filter; distinguish last-modified from last-accessed conditions.
3. Check whether access-time tracking is needed for your selected condition.
4. Explain minimum storage-duration charges, archive retrieval implications and the treatment of versions or snapshots. [S35][S83][S87]

**Pass check:** Given a sample blob name and age, predict the applicable action. Explain why a lifecycle deletion rule is not a legal retention control. Do not wait for an immediate move after saving: policy processing is asynchronous. [S37][S83]

### Lab 5 — Write a SQL regional failover runbook

**Map:** D3 and D2. **Timebox:** 45 minutes. **Mode:** Tabletop; optional two-region learning deployment.

1. Specify the databases, primary and secondary servers, selected failover policy and approval owner.
2. Use the failover-group listener in the application plan and check secondary-region network and identity dependencies.
3. Separate planned testing from emergency forced failover and document the data-loss decision.
4. Time recovery from incident detection to a successful business transaction. [S28][S86]

**Pass check:** Produce a runbook with timestamps, the last confirmed write and rollback/reconciliation steps. A tabletop gives a design estimate; only a measured deployment exercise supports a tested RTO.

### Lab 6 — Recover history and protect retention

**Map:** D3. **Timebox:** 40 minutes. **Mode:** Restore design; optional disposable SQL database.

1. Identify a recovery point before an unwanted update and plan a restore to a new database.
2. Define business checks and application reconnection steps, then plan cleanup after validation. [S97]
3. Separately compare backup-vault immutability in enabled/unlocked and locked states.
4. Check the duration covered by immutability and the applicable workload/region support. [S44][S88]

**Pass check:** Explain why a backup, a replica, soft delete, a resource lock and locked immutability solve different problems. For the vault exercise, use documentation rather than enabling an irreversible lock in a throwaway environment.

### Lab 7 — Validate an App Service slot release

**Map:** D4. **Timebox:** 35 minutes. **Mode:** Release design; optional supported App Service plan.

1. Define separate production and staging configuration and classify which settings should stay with their slots.
2. Plan warm-up and smoke tests, check source/target before swapping, and identify settings that do not swap.
3. Plan how application code remains compatible with database schema changes during deployment.
4. Define rollback checks including a real read/write operation. [S55]

**Pass check:** Explain why swapping code back does not reverse database writes or an incompatible schema migration. Slots share plan resources; include staging load when considering capacity.

### Lab 8 — Diagnose private connectivity in layers

**Map:** D4. **Timebox:** 30 minutes. **Mode:** Troubleshooting design; optional private endpoint learning deployment.

1. Trace the application's normal service hostname through DNS to the intended private IP.
2. Identify the linked private DNS zone, client network path and any hybrid resolver/forwarder.
3. Check endpoint approval, routing and applicable network restrictions before testing identity and data permissions.
4. State separately whether public network access is permitted or disabled. [S59][S89]

**Pass check:** Build a four-row evidence table: name resolution, transport connectivity, authentication and authorisation. A successful name lookup proves only the first layer. A private endpoint is not sufficient evidence that the public endpoint has been disabled.

## 16 Screenshot field guide

These eight genuine Microsoft Learn screenshots are documentation examples retrieved on 22 November 2026. They are not screenshots of your Azure tenant or evidence that a lab has run. Microsoft can change portal labels and available options. Select any image to open the original-size local copy on the website.

Use each image actively: identify the requirement, point to the relevant control, predict a failure, and state the evidence you would collect. The captions supply the architectural interpretation; the image alone is not a complete configuration recipe.

### PIM activation controls — D1

![Microsoft documentation example showing PIM activation duration, authentication, justification and approval controls](https://erikw1024.github.io/az-305-study-pack/assets/screenshots/pim-activation.png)

**Notice:** Duration, authentication requirements, justification and approval are separate decisions. The example has approval unchecked; that is not a recommended policy for every privileged role. The image header shows Microsoft Entra roles, although Microsoft also uses this illustration in its Azure resource role article. Use the correct role family and resource scope in your own design. [S84][S85]

**Retrieve:** What prevents permanent standing privilege, and who can approve an activation if the usual approver is unavailable?

**Source:** Microsoft, [PIM role-settings article](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-resource-roles-configure-role-settings). Unmodified screenshot; MIT licence, MicrosoftDocs/entra-docs. See the attribution register below.

### Diagnostic categories and destinations — D1

![Microsoft documentation example showing resource log categories, metrics and diagnostic destination checkboxes](https://erikw1024.github.io/az-305-study-pack/assets/screenshots/diagnostic-settings.png)

**Notice:** Select data on the left and destinations on the right. Category availability depends on the resource. Do not copy all categories and destinations without a retention, investigation and cost requirement. This controls platform telemetry routing, not guest-agent installation. [S20]

**Retrieve:** If metrics are visible but an audit event is missing, what collection configuration should you inspect first?

**Source:** Microsoft, [Diagnostic settings](https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/diagnostic-settings). Unmodified screenshot; CC BY 4.0.

### Policy remediation identity — D1

![Microsoft documentation example showing the managed identity and permissions for an Azure Policy assignment](https://erikw1024.github.io/az-305-study-pack/assets/screenshots/policy-remediation.png)

**Notice:** Remediation has an identity and permissions. The displayed role is an example for that policy, not a universal permission to grant every assignment. Existing-resource remediation and future request evaluation need distinct checks. [S79]

**Retrieve:** Why can an audit result remain non-compliant after a policy assignment succeeds?

**Source:** Microsoft, [Remediate resources](https://learn.microsoft.com/en-us/azure/governance/policy/how-to/remediate-resources). Unmodified screenshot; CC BY 4.0.

### Blob lifecycle conditions — D2

![Microsoft documentation example showing a last-modified lifecycle condition and cool, cold, archive and delete actions](https://erikw1024.github.io/az-305-study-pack/assets/screenshots/blob-lifecycle.png)

**Notice:** The example uses last-modified age. Archive is an offline access tier; the tier choice must fit retrieval urgency and minimum-duration economics. A deletion action does not override an immutable retention requirement. [S35][S37][S87]

**Retrieve:** Would an object that has not changed for 90 days but is read every day fit your proposed rule?

**Source:** Microsoft, [Configure lifecycle management](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-configure?tabs=azure-portal). Unmodified screenshot; CC BY 4.0.

### SQL failover group membership — D3 and D2

![Microsoft documentation example showing a SQL failover group name, secondary server and database-selection control](https://erikw1024.github.io/az-305-study-pack/assets/screenshots/sql-failover-group.png)

**Notice:** A group name and secondary server are not enough: the databases must be selected. The example banner uses a customer-managed failover policy. Choose the policy from your operational requirements and current service behaviour rather than assuming all failover is automatic. [S86]

**Retrieve:** Which connection endpoint should the application use, and which dependencies must exist in the secondary region?

**Source:** Microsoft, [Configure a SQL failover group](https://learn.microsoft.com/en-us/azure/azure-sql/database/failover-group-configure-sql-db?view=azuresql&tabs=azure-portal). Unmodified screenshot; CC BY 4.0.

### Enabled versus locked vault immutability — D3

![Microsoft documentation example showing enabled vault immutability, a 30-day specific duration and an unlocked WORM setting](https://erikw1024.github.io/az-305-study-pack/assets/screenshots/backup-immutability.png)

**Notice:** The image is enabled but unlocked. It also illustrates a specific immutability duration, which may be shorter than overall backup retention. Locking makes the setting irreversible; validate policy and support before that decision. Neither an enabled checkbox nor an Azure resource lock proves permanently protected retention. [S44][S88]

**Retrieve:** For how long is the recovery point immutable, and can an authorised person turn the setting off in the displayed state?

**Source:** Microsoft, [Manage Immutable vault operations](https://learn.microsoft.com/en-us/azure/backup/backup-azure-immutable-vault-how-to-manage). Unmodified screenshot; CC BY 4.0.

### App Service swap review — D4

![Microsoft documentation example showing source and production target slots with a configuration-change preview](https://erikw1024.github.io/az-305-study-pack/assets/screenshots/app-slot-swap.png)

**Notice:** Read the source, target and configuration changes together. The historic runtime values in this image are illustrative and are not current runtime recommendations. Treat database compatibility and external dependencies as separate release checks. [S55]

**Retrieve:** What must be tested before traffic changes, and what would a reverse swap fail to undo?

**Source:** Microsoft, [App Service deployment slots](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots). Unmodified screenshot; CC BY 4.0.

### Settings that stay with a slot — D4

![Microsoft documentation example highlighting the Deployment slot setting checkbox for an App Service application setting](https://erikw1024.github.io/az-305-study-pack/assets/screenshots/app-slot-settings.png)

**Notice:** A deployment-slot setting is associated with the slot rather than travelling with an ordinary settings swap. Classify environment-specific values deliberately. Consult the documented non-swapped settings and exceptions; do not assume every resource attribute follows this checkbox. [S55]

**Retrieve:** How would you prevent a staging release from using a production-only endpoint before approval?

**Source:** Microsoft, [App Service deployment slots](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots). Unmodified screenshot; CC BY 4.0.

### Image attribution and reuse

Copyright Microsoft Corporation. The seven Azure documentation screenshots are redistributed under the [Azure documentation repository licence](https://github.com/MicrosoftDocs/azure-docs/blob/main/LICENSE), [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). The PIM screenshot is from the [Microsoft Entra documentation repository](https://github.com/MicrosoftDocs/entra-docs) under its [MIT licence](https://github.com/MicrosoftDocs/entra-docs/blob/main/LICENSE). Images are unmodified original PNGs, displayed at responsive sizes. Microsoft trademarks remain their owners' property; no endorsement is implied. Licence notices and source-image URLs are included in the [image attribution register](https://erikw1024.github.io/az-305-study-pack/ATTRIBUTIONS.md), [source image metadata](https://erikw1024.github.io/az-305-study-pack/screenshot-sources.json) and source package.

## 17 Further reading and retrieval drills

### Choose a reading route by the decision you missed

Avoid reading every article linearly. For each route, write a one-paragraph recommendation before opening the source; revise it afterwards and record what changed.

| Decision to practise | Read next | Produce this evidence |
| --- | --- | --- |
| Human privilege activation | Azure resource PIM settings and Microsoft Entra role settings [S84][S85] | Role-family and scope comparison; activation and approval design |
| Identity for an external automation workload | Workload identity federation [S90] | Trust boundary showing issuer, subject, audience and separately assigned permissions |
| Private service name resolution | Private endpoint DNS [S89] | Lookup path from Azure and on-premises clients to the intended endpoint |
| Safe scoped object sharing | Shared access signatures [S94] | Resource, permissions, expiry, transport restriction and handling of leaked access |
| Sensitive SQL columns | Always Encrypted documentation [S93] | Threat model distinguishing TDE, masking and client-side column encryption |
| Recover after an unwanted SQL update | Restore using backups [S97] | New-database validation and application reconnection plan |
| Avoid lost integration events | Transactional outbox example [S91] | Atomic persistence boundary and duplicate-processing strategy |
| Protect API entry points | API Management JWT validation [S95] | Issuer, audience and required-claim validation plus backend access restrictions |
| Rotate encryption keys | Key Vault key rotation [S96] | Consumer adoption check and safe treatment of older key versions |
| Specify a measurable reliability target | Reliability metrics [S92] | Critical user flow, measurement window, SLI and escalation threshold |
| Expose hidden failure dependencies | Failure mode analysis [S98] | Failure, impact, detection, mitigation and recovery owner |
| Replace capacity guesses with measurements | Azure Load Testing overview [S99] | Representative workload, latency/error thresholds and a bottleneck hypothesis |

**Three details to retain:** Federation replaces an external workload's stored credential with a trust relationship; it does not assign Azure permissions automatically. For Microsoft Entra-issued tokens, the JWT policy reference points to the dedicated validate-azure-ad-token policy. Key rotation creates a new version, while consumer adoption and continued access to older encrypted data need their own plan. [S90][S95][S96]

### Rapid decision drills with model reasoning

**1. A company says every component has a 99.9% SLA, therefore the whole booking flow has 99.9% availability.** Define the actual flow and include its critical dependencies. As a simplified teaching calculation, three independent serial components at 0.999 each give 0.999 cubed, approximately 99.7003%; independence and identical measurement assumptions may not hold in practice. A workload SLO needs observed user-flow evidence and coverage beyond individual contractual SLAs. [S92]

**2. A deployment includes a private endpoint, but an on-premises client still resolves the public IP.** Inspect the client's resolver path, private zone records and hybrid forwarding. Check connectivity only after resolving the expected address. Separately decide public-access policy; creating the private endpoint does not prove public access is blocked. [S59][S89]

**3. A user has Contributor and can edit a storage account but cannot read a blob with Microsoft Entra authentication.** Distinguish control-plane operations from data-plane permissions. Identify a suitable blob data role at the required scope and check network access separately. Do not solve a narrow data permission gap by handing out account keys. [S10][S13]

**4. The same payment is processed twice although broker duplicate detection is enabled.** Trace producer identifiers, retries, the duplicate-detection window and consumer completion timing. Make the payment operation idempotent and persist its business identifier. Consider an outbox for reliable event publication; an outbox does not make a non-idempotent external side effect exactly once. [S65][S91]

**5. The database fails over successfully, but the application still cannot take bookings.** Inspect connection targets, private DNS, credentials, secondary capacity and other dependencies. Measure RTO to a validated booking rather than to database role change. Keep a separate historical restore path for corrupt data. [S77][S86][S97]

**6. Archive storage looks cheapest, so a team puts daily interactive documents there.** Revisit retrieval latency, rehydration workflow, transaction charges and minimum-duration economics. Optimise the total access pattern rather than storage capacity price alone. [S35][S83]

**7. A team wants Kubernetes because the workload uses containers.** Establish whether it needs Kubernetes APIs, operators or cluster-level control. Compare Container Apps or App Service against the required runtime, scaling and network behaviour, and include the team's operating capability. Container packaging alone does not decide the orchestrator. [S51][S53][S54]

**8. The latest official practice score is high, but the learner cannot explain failed alternatives.** Revisit each guessed answer and write the decisive requirement plus the condition under which another option becomes correct. The official guide now recommends the AI Skills Navigator assessment; it states that the legacy Learn practice assessments are no longer updated. Use the supplied official entry point, and recheck skills measured near the exam date. [S01][S04]

### Fit the new material into the six-week plan

- **Week 1:** Case A, Labs 1–3 and the three D1 screenshots. Explain identity, governance and telemetry as separate responsibilities.
- **Week 2:** Case B, Lab 4 and the blob screenshot. Draw the transaction, partition and delivery boundaries.
- **Week 3:** Case C, Labs 5–6 and the two recovery screenshots. Compare failover with historical restore using a timed runbook.
- **Week 4:** Case D, Labs 7–8 and the slot screenshots. Trace a release and a hybrid name-resolution path.
- **Week 5:** Rework every case with its changed constraint; complete all eight rapid drills without notes.
- **Week 6:** Review mistakes after a delay, repeat the official practice assessment within its usage rules and verify the current skills outline. A practice score is a diagnostic, not a guaranteed exam result.
