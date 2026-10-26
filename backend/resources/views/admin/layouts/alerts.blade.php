<div class="row my-3">
    <div class="col-md-6 mx-auto">
        @session('success')
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endsession

        @session('error')
            <div class="alert alert-danger">
                {{ session('success') }}
            </div>
        @endsession


        @session('info')
            <div class="alert alert-info">
                {{ session('success') }}
            </div>
        @endsession
    </div>
</div>