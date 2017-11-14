<style>
.breadcrumb{
   width: 100%;
   padding: 10px 0 10px 20px;
   border-bottom: 2px solid #f2f2f2;
}

</style>
<template>
    <Breadcrumb>
      <Row>
        <Col span="20">
        <Breadcrumb-item href="/merchant/home"><Icon type="ios-home-outline"></Icon> 首页</Breadcrumb-item>
        <Breadcrumb-item v-for="item in BreadcrumbData" :href="item.url">{{item.title}}</Breadcrumb-item>
        </Col>
        <Col span="3" offset="1">
        <Poptip trigger="hover" placement="bottom" class="pretip">
            <Button class="" type="ghost" size="small">立即预览</Button>
            <div class="api" slot="content">
              <div><img src="https://api.qingful.com/home/wxa/code/qrcode?Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEzMCwiYXZhdGVyX2lkIjowLCJwaG9uZSI6IjE4NjMxNDUxMjE2IiwicGFzc3dvcmRfb3JnIjoiY2hlbmdkZTM2MCIsIm5pY2tuYW1lIjoiSVQiLCJkb21haW4iOm51bGwsImVtYWlsIjpudWxsLCJxcSI6bnVsbCwic2V4IjowLCJzaWduYXR1cmUiOm51bGwsImxhc3RpcCI6IjExMC4yNTQuMjQwLjIxNyIsInN0YXR1cyI6MSwicmVtYXJrIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAxNy0wNy0wN1QxMzo0MDoxNi4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMTctMTAtMjRUMDY6MjM6NTYuMDAwWiIsImlhdCI6MTUwODgzNjE0MywiZXhwIjoxNTA5NDQwOTQzfQ.OCePGjJCXT_fznHTGtYueGveliU0dPsD78A9rqCH7L4&amp;WxaToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzA0LCJjdXN0b21faWQiOjExMzAsImF1dGhvcml6ZXJfYXBwaWQiOiJ3eDY3NzM2MWZjYWRjZTU3Y2UiLCJhdXRob3JpemVyX2FjY2Vzc190b2tlbiI6InAyZUpZSHdtYTU2VkplZzF2aDRKVU5RbU1WUVJReW9HdHhPMkktMjlDUW8wdVVicWFMV243ZmtEcW4zSjItcGlURTdqX0NNSzBuVXp4NE1OUE02d0NmbThKNzF1TmstaTAwNGRhX3AzcEtydlhFWnNBRUQwU2ZRMjdDTXljY3l4VlRPZkFNREpIQyIsImV4cGlyZXNfaW4iOiI3MTk5IiwiZXhwaXJlc19hdCI6IjE1MDc3NjY0Nzg3MzUiLCJhdXRob3JpemVyX3JlZnJlc2hfdG9rZW4iOiJyZWZyZXNodG9rZW5AQEBfcmt1SWQtbHNXUF9UenZNeDJoZHdKUEZkVmdqdEFfdjZiT05aSXIyaThNIiwibmlja19uYW1lIjoi5pm65ri45om_5b63IiwiaGVhZF9pbWciOiJodHRwOi8vd3gucWxvZ28uY24vbW1vcGVuLzlBcHVpYXpSdUVxYkFnVnlZa21hSEpMWWliWk9PTEJFRFE5S3NpYWxKaWNUbzJ0ZGt0cXpJUk9na2YzUXM4OGpyUGEyQklpYmdOM0dxQjdlaWNtMXhOeEd4SnZYNE9XS3VrSHdTVi8wIiwidXNlcl9uYW1lIjoiZ2hfZThmZDdkOGU2MGM0IiwicHJpbmNpcGFsX25hbWUiOiLmib_lvrfkuZDmuLjlrp3ova_ku7blvIDlj5HmnInpmZDlhazlj7giLCJvcGVuX3BheSI6MCwib3Blbl9zaGFrZSI6MCwib3Blbl9zY2FuIjowLCJvcGVuX2NhcmQiOjAsIm9wZW5fc3RvcmUiOjAsInNpZ25hdHVyZSI6IuWbveWGhemhtue6p-aXhea4uOWQjOS4muS6pOaYk-W5s-WPsCzkuIDkuKrlubPlj7DogarmmI7kvaDnmoTplIDllK4iLCJSZXF1ZXN0RG9tYWluIjoiaHR0cHM6Ly9hcGkucWluZ2Z1bC5jb20saHR0cHM6Ly93eC5xaW5nZnVsLmNvbSxodHRwczovL3Byb3h5LnFpbmdmdWwuY29tLGh0dHBzOi8vYmFhcy5xaW5nZnVsLmNvbSxodHRwczovL2FwaXMubWFwLnFxLmNvbSIsIldzUmVxdWVzdERvbWFpbiI6IndzczovL2FwaS5xaW5nZnVsLmNvbSx3c3M6Ly93eC5xaW5nZnVsLmNvbSx3c3M6Ly9wcm94eS5xaW5nZnVsLmNvbSxodHRwczovL2JhYXMucWluZ2Z1bC5jb20sd3NzOi8vYXBpcy5tYXAucXEuY29tIiwiVXBsb2FkRG9tYWluIjoiaHR0cHM6Ly9hcGkucWluZ2Z1bC5jb20saHR0cHM6Ly93eC5xaW5nZnVsLmNvbSxodHRwczovL3Byb3h5LnFpbmdmdWwuY29tLGh0dHBzOi8vYmFhcy5xaW5nZnVsLmNvbSxodHRwczovL2FwaXMubWFwLnFxLmNvbSIsIkRvd25sb2FkRG9tYWluIjoiaHR0cHM6Ly9hcGkucWluZ2Z1bC5jb20saHR0cHM6Ly93eC5xaW5nZnVsLmNvbSxodHRwczovL3Byb3h5LnFpbmdmdWwuY29tLGh0dHBzOi8vYmFhcy5xaW5nZnVsLmNvbSxodHRwczovL2FwaXMubWFwLnFxLmNvbSIsInZlcmlmeV90eXBlX2luZm8iOm51bGwsImZ1bmNfaW5mbyI6bnVsbCwic3RhdHVzIjoxLCJtb25leSI6MCwicXJjb2RlX3VybCI6Imh0dHA6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy9aRThXZG03c1prb2liMUF0MnZldGtvSWFYT3lGMTRXdUo4alpJb2d3UjVHcU5pYm5LTkJmSldVbkI0cUhLbXV2aWNLemIxZ09jcFZYN01lSnNrTnd0UDBzQS8wIiwiYXV0aG9yaXplZCI6MSwiYXV0b191cGRhdGUiOjEsImtlZnVfY2hhdCI6MSwiZGVidWciOjAsInN0YXJ0ZWRfYXQiOiIyMDE3LTA3LTA3VDEzOjQxOjE5LjAwMFoiLCJlbmRlZF9hdCI6IjIwMTctMDctMTRUMTM6NDE6MTkuMDAwWiIsInJlbWFyayI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMTctMDctMDdUMTM6NDE6MTkuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDE3LTEwLTExVDIyOjAyOjU5LjAwMFoiLCJpYXQiOjE1MDg4NTc4NjksImV4cCI6MTUwOTQ2MjY2OX0.vLbXgcXTWX3hvQ9YZMIq1ALnAZ1imfgIjG0TbauA3mw" lazy="loaded" style="width: 140px;"></div>
                <div style="width: 140px; white-space: normal;">用微信扫一扫, 如果提示没有体验权限，请点击装修设置=&gt;任何模版=&gt;下一步获取体验二维码=&gt;输入微信号，添加体验者。</div>
            </div>
        </Poptip>
      </Col>
    </Row>
    </Breadcrumb>
</template>
<script>
export default {
    props: ['BreadcrumbData']
};
</script>
